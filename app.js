// ErtebatYar CRM Application
class CRMApp {
    constructor() {
        this.currentUser = null;
        this.customers = [...window.predefinedCustomers];
        this.interactions = [];
        this.followups = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadStoredData();
        this.generateFollowups();
    }
    
    setupEventListeners() {
        // Auth tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchAuthTab(tab);
            });
        });
        
        // Auth forms
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
        
        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });
        
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchMainTab(tabName);
            });
        });
        
        // Customer management
        document.getElementById('addCustomerBtn').addEventListener('click', () => {
            this.openCustomerModal();
        });
        
        document.getElementById('customerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCustomerSubmit();
        });
        
        // Interaction management
        document.getElementById('addInteractionBtn').addEventListener('click', () => {
            this.openInteractionModal();
        });
        
        document.getElementById('interactionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleInteractionSubmit();
        });
        
        // Search functionality
        document.getElementById('customerSearch').addEventListener('input', (e) => {
            this.filterCustomers(e.target.value);
        });
        
        // Workflow functionality
        document.getElementById('generateWorkflowBtn').addEventListener('click', () => {
            this.generateWorkflow();
        });
        
        // Modal close buttons
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });
        
        document.getElementById('cancelCustomer').addEventListener('click', () => {
            this.closeModal(document.getElementById('customerModal'));
        });
        
        document.getElementById('cancelInteraction').addEventListener('click', () => {
            this.closeModal(document.getElementById('interactionModal'));
        });
        
        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });
    }
    
    switchAuthTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}-form`).classList.add('active');
    }
    
    switchMainTab(tab) {
        document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}-tab`).classList.add('active');
        
        // Load tab-specific content
        switch(tab) {
            case 'customers':
                this.renderCustomers();
                break;
            case 'interactions':
                this.renderInteractions();
                break;
            case 'followups':
                this.renderFollowups();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            case 'workflow':
                this.renderWorkflow();
                break;
        }
    }
    
    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation (in real app, this would be server-side)
        if (email && password) {
            this.currentUser = {
                email: email,
                storeName: "My Store",
                productType: "Fashion & Clothing"
            };
            
            this.showDashboard();
            this.showMessage('Login successful!', 'success');
        } else {
            this.showMessage('Please fill in all fields', 'error');
        }
    }
    
    handleRegister() {
        const storeName = document.getElementById('regStoreName').value;
        const productType = document.getElementById('regProductType').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        
        if (storeName && productType && email && password) {
            this.currentUser = {
                email: email,
                storeName: storeName,
                productType: productType
            };
            
            this.showDashboard();
            this.showMessage('Registration successful!', 'success');
        } else {
            this.showMessage('Please fill in all fields', 'error');
        }
    }
    
    handleLogout() {
        this.currentUser = null;
        this.showAuthScreen();
        this.showMessage('Logged out successfully', 'success');
    }
    
    showAuthScreen() {
        document.getElementById('auth-screen').classList.add('active');
        document.getElementById('dashboard-screen').classList.remove('active');
        
        // Update store info
        document.getElementById('storeName').textContent = 'My Store';
        document.getElementById('productType').textContent = 'Fashion & Clothing';
    }
    
    showDashboard() {
        document.getElementById('auth-screen').classList.remove('active');
        document.getElementById('dashboard-screen').classList.add('active');
        
        // Update store info
        if (this.currentUser) {
            document.getElementById('storeName').textContent = this.currentUser.storeName;
            document.getElementById('productType').textContent = this.currentUser.productType;
        }
        
        // Load initial content
        this.renderCustomers();
    }
    
    openCustomerModal() {
        document.getElementById('customerModalTitle').textContent = 'Add New Customer';
        document.getElementById('customerForm').reset();
        document.getElementById('customerModal').classList.add('active');
    }
    
    handleCustomerSubmit() {
        const customerData = {
            id: this.customers.length + 1,
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            email: document.getElementById('customerEmail').value,
            budget: document.getElementById('customerBudget').value,
            brands: document.getElementById('customerBrands').value,
            colors: document.getElementById('customerColors').value,
            lastPurchase: document.getElementById('customerLastPurchase').value,
            occasions: document.getElementById('customerOccasions').value,
            interactions: []
        };
        
        this.customers.push(customerData);
        this.closeModal(document.getElementById('customerModal'));
        this.renderCustomers();
        this.showMessage('Customer added successfully!', 'success');
        this.saveData();
    }
    
    openInteractionModal() {
        this.populateCustomerSelect();
        document.getElementById('interactionForm').reset();
        document.getElementById('interactionDate').value = new Date().toISOString().slice(0, 16);
        document.getElementById('interactionModal').classList.add('active');
    }
    
    populateCustomerSelect() {
        const select = document.getElementById('interactionCustomer');
        select.innerHTML = '<option value="">Select Customer</option>';
        
        this.customers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.id;
            option.textContent = customer.name;
            select.appendChild(option);
        });
    }
    
    handleInteractionSubmit() {
        const customerId = parseInt(document.getElementById('interactionCustomer').value);
        const customer = this.customers.find(c => c.id === customerId);
        
        if (!customer) {
            this.showMessage('Please select a customer', 'error');
            return;
        }
        
        const interactionData = {
            id: Date.now(),
            customerId: customerId,
            customerName: customer.name,
            type: document.getElementById('interactionType').value,
            date: document.getElementById('interactionDate').value,
            notes: document.getElementById('interactionNotes').value,
            purchase: document.getElementById('interactionPurchase').value,
            reaction: document.getElementById('interactionReaction').value,
            followup: document.getElementById('interactionFollowup').value
        };
        
        // Add to customer's interactions
        customer.interactions.push(interactionData);
        
        // Add to global interactions list
        this.interactions.push(interactionData);
        
        this.closeModal(document.getElementById('interactionModal'));
        this.renderInteractions();
        this.generateFollowups();
        this.showMessage('Interaction recorded successfully!', 'success');
        this.saveData();
    }
    
    renderCustomers() {
        const grid = document.getElementById('customersGrid');
        grid.innerHTML = '';
        
        this.customers.forEach(customer => {
            const card = document.createElement('div');
            card.className = 'customer-card';
            card.innerHTML = `
                <div class="customer-header">
                    <div>
                        <div class="customer-name">${customer.name}</div>
                        <div class="customer-contact">${customer.phone} • ${customer.email}</div>
                    </div>
                    <div class="customer-budget">$${customer.budget}</div>
                </div>
                <div class="customer-details">
                    <div class="customer-detail">
                        <span>Brands:</span>
                        <span>${customer.brands}</span>
                    </div>
                    <div class="customer-detail">
                        <span>Colors:</span>
                        <span>${customer.colors}</span>
                    </div>
                    <div class="customer-detail">
                        <span>Last Purchase:</span>
                        <span>${customer.lastPurchase || 'Never'}</span>
                    </div>
                    <div class="customer-detail">
                        <span>Occasions:</span>
                        <span>${customer.occasions}</span>
                    </div>
                    <div class="customer-detail">
                        <span>Interactions:</span>
                        <span>${customer.interactions.length}</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
    
    renderInteractions() {
        const list = document.getElementById('interactionsList');
        list.innerHTML = '';
        
        // Get all interactions from all customers
        const allInteractions = [];
        this.customers.forEach(customer => {
            customer.interactions.forEach(interaction => {
                allInteractions.push({
                    ...interaction,
                    customerName: customer.name
                });
            });
        });
        
        // Sort by date (newest first)
        allInteractions.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        allInteractions.forEach(interaction => {
            const item = document.createElement('div');
            item.className = 'interaction-item';
            item.innerHTML = `
                <div class="interaction-header">
                    <div class="interaction-customer">${interaction.customerName}</div>
                    <div class="interaction-type">${interaction.type}</div>
                </div>
                <div class="interaction-date">${new Date(interaction.date).toLocaleString()}</div>
                <div class="interaction-content">
                    ${interaction.notes ? `<div class="interaction-note"><strong>Notes:</strong> ${interaction.notes}</div>` : ''}
                    ${interaction.purchase ? `<div class="interaction-note"><strong>Purchase:</strong> ${interaction.purchase}</div>` : ''}
                    ${interaction.reaction ? `<div class="interaction-note"><strong>Reaction:</strong> ${interaction.reaction}</div>` : ''}
                    ${interaction.followup ? `<div class="interaction-note"><strong>Follow-up:</strong> ${interaction.followup}</div>` : ''}
                </div>
            `;
            list.appendChild(item);
        });
    }
    
    generateFollowups() {
        this.followups = [];
        
        // Diverse follow-up messages based on different scenarios
        const followupMessages = {
            longAbsence: [
                "مشتری مدت زیادی است که تماس نگرفته - احتمالاً نیاز به یادآوری دارد",
                "مشتری برای مدت طولانی خرید نکرده - پیشنهاد محصولات جدید",
                "مشتری ممکن است به فروشگاه دیگری رفته باشد - بررسی رضایت",
                "مشتری احتمالاً منتظر پیشنهاد ویژه است - ارسال تخفیف"
            ],
            budgetIncrease: [
                "بودجه مشتری افزایش یافته - پیشنهاد محصولات گران‌تر",
                "مشتری آماده خرید محصولات لوکس است - نمایش کالکشن جدید",
                "مشتری در حال ارتقای سلیقه است - معرفی برندهای بهتر"
            ],
            seasonal: [
                "فصل مناسب برای محصولات مشتری فرا رسیده - پیشنهاد فصلی",
                "مناسبت خاص نزدیک است - پیشنهاد کادو",
                "مشتری معمولاً در این فصل خرید می‌کند - یادآوری"
            ],
            complaint: [
                "مشتری شکایت داشت - بررسی رضایت و جبران",
                "مشتری ناراضی بود - پیشنهاد جبران خسارت",
                "مشتری مشکل داشت - پیگیری حل مسئله"
            ],
            inquiry: [
                "مشتری سوال داشت - ارسال اطلاعات تکمیلی",
                "مشتری منتظر پاسخ است - تماس و ارائه راه‌حل",
                "مشتری نیاز به مشاوره دارد - تماس تخصصی"
            ],
            purchase: [
                "مشتری خرید کرد - بررسی رضایت و پیشنهاد مکمل",
                "مشتری محصول خریداری کرد - پیشنهاد لوازم جانبی",
                "مشتری خرید انجام داد - پیشنهاد محصولات مرتبط"
            ]
        };
        
        const suggestedActions = [
            "تماس تلفنی برای بررسی رضایت",
            "ارسال پیامک با پیشنهاد ویژه",
            "ارسال ایمیل با کاتالوگ جدید",
            "دعوت به فروشگاه برای نمایش محصولات",
            "ارسال نمونه رایگان",
            "پیشنهاد تخفیف ویژه",
            "مشاوره رایگان در فروشگاه",
            "ارسال هدیه کوچک",
            "برگزاری رویداد ویژه",
            "ارسال نظرسنجی رضایت"
        ];
        
        this.customers.forEach(customer => {
            const lastInteraction = customer.interactions[customer.interactions.length - 1];
            if (lastInteraction) {
                const daysSinceLastContact = Math.floor((new Date() - new Date(lastInteraction.date)) / (1000 * 60 * 60 * 24));
                
                // Generate follow-ups based on different criteria
                let shouldFollowUp = false;
                let message = "";
                let priority = "medium";
                
                // Long absence (14+ days)
                if (daysSinceLastContact >= 14) {
                    shouldFollowUp = true;
                    const messages = followupMessages.longAbsence;
                    message = messages[Math.floor(Math.random() * messages.length)];
                    priority = daysSinceLastContact >= 30 ? 'high' : 'medium';
                }
                
                // Budget increase scenario
                if (customer.budget === "200-500" && Math.random() > 0.7) {
                    shouldFollowUp = true;
                    const messages = followupMessages.budgetIncrease;
                    message = messages[Math.floor(Math.random() * messages.length)];
                    priority = "medium";
                }
                
                // Seasonal follow-up (random chance)
                if (Math.random() > 0.8) {
                    shouldFollowUp = true;
                    const messages = followupMessages.seasonal;
                    message = messages[Math.floor(Math.random() * messages.length)];
                    priority = "low";
                }
                
                // Low priority follow-up for recent customers
                if (customer.interactions.length === 1 && daysSinceLastContact >= 7 && Math.random() > 0.6) {
                    shouldFollowUp = true;
                    message = "مشتری جدید - بررسی رضایت اولیه";
                    priority = "low";
                }
                
                // Based on last interaction type
                if (lastInteraction.type === "complaint" && Math.random() > 0.5) {
                    shouldFollowUp = true;
                    const messages = followupMessages.complaint;
                    message = messages[Math.floor(Math.random() * messages.length)];
                    priority = "high";
                }
                
                if (lastInteraction.type === "inquiry" && daysSinceLastContact >= 7) {
                    shouldFollowUp = true;
                    const messages = followupMessages.inquiry;
                    message = messages[Math.floor(Math.random() * messages.length)];
                    priority = "medium";
                }
                
                if (lastInteraction.type === "purchase" && daysSinceLastContact >= 10) {
                    shouldFollowUp = true;
                    const messages = followupMessages.purchase;
                    message = messages[Math.floor(Math.random() * messages.length)];
                    priority = "low";
                }
                
                if (shouldFollowUp) {
                    const suggestedAction = suggestedActions[Math.floor(Math.random() * suggestedActions.length)];
                    
                    this.followups.push({
                        id: Date.now() + Math.random(),
                        customerId: customer.id,
                        customerName: customer.name,
                        priority: priority,
                        message: message,
                        lastContact: lastInteraction.date,
                        suggestedAction: suggestedAction,
                        daysSinceContact: daysSinceLastContact,
                        lastInteractionType: lastInteraction.type
                    });
                }
            }
        });
        
        // Sort follow-ups by priority (high first) and then by days since contact
        this.followups.sort((a, b) => {
            const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return b.daysSinceContact - a.daysSinceContact;
        });
    }
    
    renderFollowups() {
        const list = document.getElementById('followupsList');
        list.innerHTML = '';
        
        if (this.followups.length === 0) {
            list.innerHTML = '<div class="message success">در حال حاضر هیچ پیگیری مورد نیاز نیست!</div>';
            return;
        }
        
        this.followups.forEach(followup => {
            const item = document.createElement('div');
            item.className = 'followup-item';
            item.innerHTML = `
                <div class="followup-header">
                    <div class="followup-customer">${followup.customerName}</div>
                    <div class="followup-priority ${followup.priority}">${followup.priority}</div>
                </div>
                <div class="followup-content">
                    <div><strong>موضوع:</strong> ${followup.message}</div>
                    <div><strong>آخرین تماس:</strong> ${new Date(followup.lastContact).toLocaleDateString('fa-IR')} (${followup.daysSinceContact} روز پیش)</div>
                    <div><strong>نوع آخرین تعامل:</strong> ${followup.lastInteractionType}</div>
                    <div><strong>اقدام پیشنهادی:</strong> ${followup.suggestedAction}</div>
                </div>
            `;
            list.appendChild(item);
        });
    }
    
    renderAnalytics() {
        const dashboard = document.getElementById('analyticsDashboard');
        
        // Calculate statistics
        const totalCustomers = this.customers.length;
        const totalInteractions = this.customers.reduce((sum, customer) => sum + customer.interactions.length, 0);
        const avgInteractionsPerCustomer = totalInteractions / totalCustomers;
        
        // Budget distribution
        const budgetDistribution = this.customers.reduce((acc, customer) => {
            acc[customer.budget] = (acc[customer.budget] || 0) + 1;
            return acc;
        }, {});
        
        // Most active customers (by interaction count)
        const activeCustomers = this.customers
            .filter(customer => customer.interactions.length > 0)
            .sort((a, b) => b.interactions.length - a.interactions.length)
            .slice(0, 5);
        
        // Recent activity (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentInteractions = this.customers.reduce((sum, customer) => {
            return sum + customer.interactions.filter(interaction => 
                new Date(interaction.date) >= thirtyDaysAgo
            ).length;
        }, 0);
        
        dashboard.innerHTML = `
            <div class="analytics-card">
                <h4><i class="fas fa-users"></i> Customer Overview</h4>
                <div class="stat-item">
                    <span class="stat-label">Total Customers:</span>
                    <span class="stat-value">${totalCustomers}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Total Interactions:</span>
                    <span class="stat-value">${totalInteractions}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Avg Interactions/Customer:</span>
                    <span class="stat-value">${avgInteractionsPerCustomer.toFixed(1)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Recent Activity (30 days):</span>
                    <span class="stat-value">${recentInteractions}</span>
                </div>
            </div>
            
            <div class="analytics-card">
                <h4><i class="fas fa-chart-pie"></i> Budget Distribution</h4>
                ${Object.entries(budgetDistribution).map(([budget, count]) => `
                    <div class="stat-item">
                        <span class="stat-label">$${budget}:</span>
                        <span class="stat-value">${count} customers</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="analytics-card">
                <h4><i class="fas fa-star"></i> Most Active Customers</h4>
                ${activeCustomers.map(customer => `
                    <div class="stat-item">
                        <span class="stat-label">${customer.name}:</span>
                        <span class="stat-value">${customer.interactions.length} interactions</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="analytics-card">
                <h4><i class="fas fa-bell"></i> Follow-up Status</h4>
                <div class="stat-item">
                    <span class="stat-label">Pending Follow-ups:</span>
                    <span class="stat-value">${this.followups.length}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">High Priority:</span>
                    <span class="stat-value">${this.followups.filter(f => f.priority === 'high').length}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Medium Priority:</span>
                    <span class="stat-value">${this.followups.filter(f => f.priority === 'medium').length}</span>
                </div>
            </div>
        `;
    }
    
    filterCustomers(searchTerm) {
        const filteredCustomers = this.customers.filter(customer => 
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.brands.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        const grid = document.getElementById('customersGrid');
        grid.innerHTML = '';
        
        filteredCustomers.forEach(customer => {
            const card = document.createElement('div');
            card.className = 'customer-card';
            card.innerHTML = `
                <div class="customer-header">
                    <div>
                        <div class="customer-name">${customer.name}</div>
                        <div class="customer-contact">${customer.phone} • ${customer.email}</div>
                    </div>
                    <div class="customer-budget">$${customer.budget}</div>
                </div>
                <div class="customer-details">
                    <div class="customer-detail">
                        <span>Brands:</span>
                        <span>${customer.brands}</span>
                    </div>
                    <div class="customer-detail">
                        <span>Colors:</span>
                        <span>${customer.colors}</span>
                    </div>
                    <div class="customer-detail">
                        <span>Last Purchase:</span>
                        <span>${customer.lastPurchase || 'Never'}</span>
                    </div>
                    <div class="customer-detail">
                        <span>Occasions:</span>
                        <span>${customer.occasions}</span>
                    </div>
                    <div class="customer-detail">
                        <span>Interactions:</span>
                        <span>${customer.interactions.length}</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
    
    closeModal(modal) {
        modal.classList.remove('active');
    }
    
    showMessage(message, type) {
        // Remove existing messages
        document.querySelectorAll('.message').forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        // Insert at the top of the main content
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(messageDiv, mainContent.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    saveData() {
        localStorage.setItem('ertebatyar_customers', JSON.stringify(this.customers));
        localStorage.setItem('ertebatyar_interactions', JSON.stringify(this.interactions));
        localStorage.setItem('ertebatyar_user', JSON.stringify(this.currentUser));
    }
    
    renderWorkflow() {
        this.populateWorkflowCustomerSelect();
    }
    
    populateWorkflowCustomerSelect() {
        const select = document.getElementById('workflowCustomerSelect');
        select.innerHTML = '<option value="">انتخاب مشتری</option>';
        
        this.customers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.id;
            option.textContent = customer.name;
            select.appendChild(option);
        });
    }
    
    generateWorkflow() {
        const customerId = parseInt(document.getElementById('workflowCustomerSelect').value);
        const customer = this.customers.find(c => c.id === customerId);
        
        if (!customer) {
            this.showMessage('لطفاً مشتری را انتخاب کنید', 'error');
            return;
        }
        
        this.renderCustomerWorkflow(customer);
    }
    
    renderCustomerWorkflow(customer) {
        const container = document.getElementById('workflowContainer');
        
        // Calculate customer journey stage
        const journeyStage = this.calculateCustomerJourneyStage(customer);
        const strategy = this.generateCustomerStrategy(customer);
        
        container.innerHTML = `
            <div class="workflow-customer-info">
                <div class="workflow-customer-name">${customer.name}</div>
                <div class="workflow-customer-details">
                    <div class="workflow-customer-detail">
                        <div class="workflow-customer-detail-label">بودجه</div>
                        <div class="workflow-customer-detail-value">$${customer.budget}</div>
                    </div>
                    <div class="workflow-customer-detail">
                        <div class="workflow-customer-detail-label">تعداد تعاملات</div>
                        <div class="workflow-customer-detail-value">${customer.interactions.length}</div>
                    </div>
                    <div class="workflow-customer-detail">
                        <div class="workflow-customer-detail-label">آخرین خرید</div>
                        <div class="workflow-customer-detail-value">${customer.lastPurchase || 'هیچ'}</div>
                    </div>
                    <div class="workflow-customer-detail">
                        <div class="workflow-customer-detail-label">مرحله فعلی</div>
                        <div class="workflow-customer-detail-value">${journeyStage}</div>
                    </div>
                </div>
            </div>
            
            <div class="workflow-diagram">
                ${this.generateWorkflowStages(customer, journeyStage, strategy)}
            </div>
        `;
    }
    
    calculateCustomerJourneyStage(customer) {
        const interactionCount = customer.interactions.length;
        const lastPurchase = customer.lastPurchase;
        const daysSinceLastPurchase = lastPurchase ? 
            Math.floor((new Date() - new Date(lastPurchase)) / (1000 * 60 * 60 * 24)) : 999;
        
        if (interactionCount === 0) return "مشتری جدید";
        if (interactionCount === 1) return "آشنایی اولیه";
        if (interactionCount >= 2 && interactionCount <= 4) return "در حال بررسی";
        if (interactionCount >= 5 && daysSinceLastPurchase <= 30) return "مشتری وفادار";
        if (daysSinceLastPurchase > 30) return "مشتری غیرفعال";
        return "مشتری معمولی";
    }
    
    generateCustomerStrategy(customer) {
        const budget = customer.budget;
        const brands = customer.brands;
        const occasions = customer.occasions;
        const journeyStage = this.calculateCustomerJourneyStage(customer);
        
        return {
            acquisition: this.getAcquisitionStrategy(customer, journeyStage),
            engagement: this.getEngagementStrategy(customer, journeyStage),
            retention: this.getRetentionStrategy(customer, journeyStage),
            loyalty: this.getLoyaltyStrategy(customer, journeyStage),
            reactivation: this.getReactivationStrategy(customer, journeyStage)
        };
    }
    
    getAcquisitionStrategy(customer, stage) {
        if (stage === "مشتری جدید") {
            const budgetBasedActions = {
                "0-50": ["ارائه تخفیف 20% برای خرید اول", "معرفی محصولات اقتصادی", "ارسال کوپن رایگان"],
                "50-100": ["ارائه تخفیف 15% برای خرید اول", "معرفی محصولات با کیفیت متوسط", "ارسال نمونه کوچک"],
                "100-200": ["ارائه تخفیف 10% برای خرید اول", "معرفی محصولات با کیفیت بالا", "ارسال کاتالوگ لوکس"],
                "200-500": ["ارائه تخفیف 5% برای خرید اول", "معرفی محصولات پریمیوم", "ارسال نمونه کامل"],
                "500+": ["ارائه خدمات شخصی", "معرفی محصولات انحصاری", "ارسال هدیه ویژه"]
            };
            
            return {
                title: "استراتژی جذب",
                description: `تمرکز بر معرفی برند و ایجاد اعتماد اولیه برای مشتری با بودجه $${customer.budget}`,
                actions: budgetBasedActions[customer.budget] || budgetBasedActions["100-200"],
                timeline: "هفته اول",
                priority: "بالا"
            };
        }
        return null;
    }
    
    getEngagementStrategy(customer, stage) {
        if (stage === "آشنایی اولیه" || stage === "در حال بررسی") {
            const brandBasedActions = {
                "نایک، آدیداس، اپل": ["ارسال محتوای ورزشی", "دعوت به رویدادهای ورزشی", "معرفی محصولات جدید ورزشی"],
                "سامسونگ، سونی، مایکروسافت": ["ارسال محتوای تکنولوژی", "دعوت به نمایشگاه تکنولوژی", "معرفی محصولات جدید تکنولوژی"],
                "گوچی، پرادا، لویی ویتون": ["ارسال محتوای مد و فشن", "دعوت به نمایش مد", "معرفی کالکشن جدید"],
                "H&M، زارا، فوراور 21": ["ارسال محتوای مد روز", "دعوت به فروش ویژه", "معرفی ترندهای جدید"]
            };
            
            const occasionBasedActions = {
                "تولد، سالگرد": ["ارسال پیام تبریک", "پیشنهاد کادو ویژه", "تخفیف مناسبت"],
                "عروسی، فارغ‌التحصیلی": ["ارسال محتوای مناسبت", "پیشنهاد محصولات مناسب", "خدمات ویژه مناسبت"],
                "کار، تجارت": ["ارسال محتوای حرفه‌ای", "دعوت به رویدادهای کسب‌وکار", "معرفی محصولات حرفه‌ای"]
            };
            
            const actions = brandBasedActions[customer.brands] || occasionBasedActions[customer.occasions] || [
                "ارسال محتوای آموزشی",
                "دعوت به رویدادهای فروشگاه",
                "ارائه مشاوره رایگان",
                "ارسال نمونه محصولات"
            ];
            
            return {
                title: "استراتژی تعامل",
                description: `افزایش تعامل و آگاهی از محصولات بر اساس علایق مشتری (${customer.brands})`,
                actions: actions,
                timeline: "2-4 هفته",
                priority: "متوسط"
            };
        }
        return null;
    }
    
    getRetentionStrategy(customer, stage) {
        if (stage === "مشتری وفادار") {
            const colorBasedActions = {
                "آبی، مشکی، سفید": ["ارائه محصولات کلاسیک", "کالکشن رنگ‌های خنثی", "طراحی مینیمال"],
                "صورتی، بنفش، قرمز": ["ارائه محصولات رنگارنگ", "کالکشن رنگ‌های گرم", "طراحی پرانرژی"],
                "طلایی، نقره‌ای، مشکی": ["ارائه محصولات لوکس", "کالکشن رنگ‌های متالیک", "طراحی شیک"]
            };
            
            const interactionCount = customer.interactions.length;
            const retentionLevel = interactionCount >= 10 ? "VIP" : interactionCount >= 5 ? "Premium" : "Standard";
            
            const retentionActions = {
                "VIP": ["دسترسی انحصاری به محصولات جدید", "خدمات شخصی‌سازی شده", "هدایای ویژه ماهانه"],
                "Premium": ["دسترسی زودهنگام به محصولات", "تخفیف‌های ویژه", "خدمات پس از فروش رایگان"],
                "Standard": ["برنامه وفاداری", "پیشنهادات شخصی‌سازی شده", "خدمات پس از فروش"]
            };
            
            return {
                title: "استراتژی حفظ",
                description: `حفظ رضایت مشتری ${retentionLevel} با ${customer.interactions.length} تعامل قبلی`,
                actions: [
                    ...retentionActions[retentionLevel],
                    ...(colorBasedActions[customer.colors] || ["پیشنهادات شخصی‌سازی شده"])
                ],
                timeline: "مستمر",
                priority: "بالا"
            };
        }
        return null;
    }
    
    getLoyaltyStrategy(customer, stage) {
        if (stage === "مشتری وفادار") {
            const budgetBasedLoyalty = {
                "0-50": ["برنامه امتیازدهی ساده", "تخفیف‌های کوچک", "هدایای کوچک"],
                "50-100": ["برنامه امتیازدهی متوسط", "تخفیف‌های متوسط", "هدایای متوسط"],
                "100-200": ["برنامه امتیازدهی پیشرفته", "تخفیف‌های بزرگ", "هدایای باارزش"],
                "200-500": ["برنامه VIP", "تخفیف‌های انحصاری", "هدایای لوکس"],
                "500+": ["برنامه سفیر برند", "خدمات شخصی", "هدایای انحصاری"]
            };
            
            const occasionBasedLoyalty = {
                "تولد، سالگرد": ["برنامه سالگرد", "هدایای تولد", "تخفیف‌های مناسبت"],
                "عروسی، فارغ‌التحصیلی": ["برنامه مناسبت‌های خاص", "هدایای مناسبت", "خدمات ویژه"],
                "کار، تجارت": ["برنامه کسب‌وکار", "هدایای حرفه‌ای", "خدمات تجاری"]
            };
            
            const loyaltyActions = [
                ...budgetBasedLoyalty[customer.budget] || budgetBasedLoyalty["100-200"],
                ...occasionBasedLoyalty[customer.occasions] || ["برنامه ارجاع دوستان"]
            ];
            
            return {
                title: "استراتژی وفاداری",
                description: `تبدیل مشتری با بودجه $${customer.budget} به سفیر برند`,
                actions: loyaltyActions,
                timeline: "بلندمدت",
                priority: "متوسط"
            };
        }
        return null;
    }
    
    getReactivationStrategy(customer, stage) {
        if (stage === "مشتری غیرفعال") {
            const lastPurchase = customer.lastPurchase;
            const daysSinceLastPurchase = lastPurchase ? 
                Math.floor((new Date() - new Date(lastPurchase)) / (1000 * 60 * 60 * 24)) : 999;
            
            const reactivationLevel = daysSinceLastPurchase > 90 ? "Critical" : 
                                    daysSinceLastPurchase > 60 ? "High" : "Medium";
            
            const reactivationActions = {
                "Critical": ["ارسال پیام شخصی", "پیشنهاد تخفیف 30%", "بررسی علت عدم خرید", "ارائه محصولات کاملاً جدید"],
                "High": ["ارسال پیام یادآوری", "پیشنهاد تخفیف 20%", "معرفی محصولات جدید", "دعوت به رویداد ویژه"],
                "Medium": ["ارسال پیام یادآوری", "پیشنهاد تخفیف 15%", "معرفی محصولات جدید", "ارسال کاتالوگ"]
            };
            
            const brandBasedReactivation = {
                "نایک، آدیداس، اپل": ["معرفی محصولات ورزشی جدید", "دعوت به رویداد ورزشی"],
                "سامسونگ، سونی، مایکروسافت": ["معرفی تکنولوژی جدید", "دعوت به نمایشگاه تکنولوژی"],
                "گوچی، پرادا، لویی ویتون": ["معرفی کالکشن جدید", "دعوت به نمایش مد"]
            };
            
            return {
                title: "استراتژی بازفعال‌سازی",
                description: `بازگرداندن مشتری غیرفعال (${daysSinceLastPurchase} روز از آخرین خرید) - سطح ${reactivationLevel}`,
                actions: [
                    ...reactivationActions[reactivationLevel],
                    ...(brandBasedReactivation[customer.brands] || [])
                ],
                timeline: "1-2 ماه",
                priority: "بالا"
            };
        }
        return null;
    }
    
    generateWorkflowStages(customer, journeyStage, strategy) {
        const stages = [
            {
                id: 'acquisition',
                title: 'جذب مشتری',
                icon: 'fas fa-user-plus',
                strategy: strategy.acquisition,
                status: journeyStage === "مشتری جدید" ? "current" : 
                       customer.interactions.length > 0 ? "completed" : "pending"
            },
            {
                id: 'engagement',
                title: 'تعامل و آشنایی',
                icon: 'fas fa-handshake',
                strategy: strategy.engagement,
                status: journeyStage === "آشنایی اولیه" || journeyStage === "در حال بررسی" ? "current" :
                       customer.interactions.length > 1 ? "completed" : "pending"
            },
            {
                id: 'retention',
                title: 'حفظ مشتری',
                icon: 'fas fa-heart',
                strategy: strategy.retention,
                status: journeyStage === "مشتری وفادار" ? "current" :
                       customer.lastPurchase ? "completed" : "pending"
            },
            {
                id: 'loyalty',
                title: 'وفاداری و ارجاع',
                icon: 'fas fa-star',
                strategy: strategy.loyalty,
                status: journeyStage === "مشتری وفادار" && customer.interactions.length > 5 ? "current" : "pending"
            },
            {
                id: 'reactivation',
                title: 'بازفعال‌سازی',
                icon: 'fas fa-redo',
                strategy: strategy.reactivation,
                status: journeyStage === "مشتری غیرفعال" ? "current" : "pending"
            }
        ];
        
        return stages.map((stage, index) => {
            const statusText = {
                'completed': 'تکمیل شده',
                'current': 'فعلی',
                'pending': 'در انتظار'
            };
            
            return `
                <div class="workflow-stage ${stage.status}">
                    <div class="workflow-stage-header">
                        <div class="workflow-stage-title">
                            <div class="workflow-stage-icon">
                                <i class="${stage.icon}"></i>
                            </div>
                            ${stage.title}
                        </div>
                        <div class="workflow-stage-status ${stage.status}">
                            ${statusText[stage.status]}
                        </div>
                    </div>
                    
                    ${stage.strategy ? `
                        <div class="workflow-stage-content">
                            <div class="workflow-stage-description">
                                ${stage.strategy.description}
                            </div>
                            
                            <div class="workflow-stage-details">
                                <div class="workflow-detail-item">
                                    <div class="workflow-detail-label">اولویت</div>
                                    <div class="workflow-detail-value">${stage.strategy.priority}</div>
                                </div>
                                <div class="workflow-detail-item">
                                    <div class="workflow-detail-label">زمان‌بندی</div>
                                    <div class="workflow-detail-value">${stage.strategy.timeline}</div>
                                </div>
                            </div>
                            
                            <div class="workflow-stage-details">
                                ${stage.strategy.actions.map(action => `
                                    <div class="workflow-detail-item">
                                        <div class="workflow-detail-label">اقدام</div>
                                        <div class="workflow-detail-value">${action}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : `
                        <div class="workflow-stage-content">
                            <div class="workflow-stage-description">
                                این مرحله هنوز شروع نشده است
                            </div>
                        </div>
                    `}
                </div>
                
                ${index < stages.length - 1 ? '<div class="workflow-arrow"><i class="fas fa-arrow-down"></i></div>' : ''}
            `;
        }).join('');
    }
    
    loadStoredData() {
        const storedCustomers = localStorage.getItem('ertebatyar_customers');
        const storedInteractions = localStorage.getItem('ertebatyar_interactions');
        const storedUser = localStorage.getItem('ertebatyar_user');
        
        if (storedCustomers) {
            this.customers = JSON.parse(storedCustomers);
        }
        
        if (storedInteractions) {
            this.interactions = JSON.parse(storedInteractions);
        }
        
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.showDashboard();
        }
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CRMApp();
});
