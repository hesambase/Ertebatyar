// Predefined customer data for ErtebatYar CRM with Persian names
const predefinedCustomers = [
    {
        id: 1,
        name: "احمد رضایی",
        phone: "+98-912-345-6789",
        email: "ahmad.rezaei@email.com",
        budget: "100-200",
        brands: "نایک، آدیداس، اپل",
        colors: "آبی، مشکی، سفید",
        lastPurchase: "2024-01-15",
        occasions: "تولد، سالگرد",
        interactions: [
            {
                id: 1,
                type: "purchase",
                date: "2024-01-15T14:30:00",
                notes: "به دنبال کفش ورزشی بود",
                purchase: "کفش نایک ایر مکس 270",
                reaction: "very-positive",
                followup: "بررسی رضایت بعد از 2 هفته"
            }
        ]
    },
    {
        id: 2,
        name: "فاطمه احمدی",
        phone: "+98-913-456-7890",
        email: "fatemeh.ahmadi@email.com",
        budget: "200-500",
        brands: "سامسونگ، سونی، مایکروسافت",
        colors: "مشکی، نقره‌ای، خاکستری",
        lastPurchase: "2024-01-10",
        occasions: "کار، بازی",
        interactions: [
            {
                id: 2,
                type: "call",
                date: "2024-01-10T10:15:00",
                notes: "در مورد لپ‌تاپ گیمینگ سوال کرد",
                purchase: "لپ‌تاپ ایسوس ROG Strix G15",
                reaction: "positive",
                followup: "پیگیری سوالات گارانتی"
            }
        ]
    },
    {
        id: 3,
        name: "محمد کریمی",
        phone: "+98-914-567-8901",
        email: "mohammad.karimi@email.com",
        budget: "50-100",
        brands: "H&M، زارا، فوراور 21",
        colors: "صورتی، بنفش، قرمز",
        lastPurchase: "2024-01-08",
        occasions: "مهمانی، شب رمانتیک",
        interactions: [
            {
                id: 3,
                type: "visit",
                date: "2024-01-08T16:45:00",
                notes: "برای لباس مهمانی خرید می‌کرد",
                purchase: "لباس گلدار زارا",
                reaction: "very-positive",
                followup: "ارسال پیشنهادات مشابه"
            }
        ]
    },
    {
        id: 4,
        name: "زهرا محمدی",
        phone: "+98-915-678-9012",
        email: "zahra.mohammadi@email.com",
        budget: "100-200",
        brands: "گوچی، پرادا، لویی ویتون",
        colors: "طلایی، نقره‌ای، مشکی",
        lastPurchase: "2024-01-05",
        occasions: "عروسی، فارغ‌التحصیلی",
        interactions: [
            {
                id: 4,
                type: "purchase",
                date: "2024-01-05T11:20:00",
                notes: "کیف دستی لوکس می‌خواست",
                purchase: "کیف گوچی Marmont",
                reaction: "very-positive",
                followup: "ارسال کالکشن جدید"
            }
        ]
    },
    {
        id: 5,
        name: "علی حسینی",
        phone: "+98-916-789-0123",
        email: "ali.hosseini@email.com",
        budget: "200-500",
        brands: "تسلا، بی‌ام‌دبلیو، مرسدس",
        colors: "سفید، مشکی، نقره‌ای",
        lastPurchase: "2024-01-03",
        occasions: "کار، تجارت",
        interactions: [
            {
                id: 5,
                type: "inquiry",
                date: "2024-01-03T09:30:00",
                notes: "در مورد خودرو برقی سوال کرد",
                purchase: "",
                reaction: "positive",
                followup: "ارسال اطلاعات تکمیلی"
            }
        ]
    },
    {
        id: 6,
        name: "مریم صادقی",
        phone: "+98-917-890-1234",
        email: "maryam.sadeghi@email.com",
        budget: "50-100",
        brands: "استارباکس، مک‌دونالدز، ساب‌وی",
        colors: "قهوه‌ای، بژ، تان",
        lastPurchase: "2024-01-01",
        occasions: "تعطیلات، مسافرت",
        interactions: [
            {
                id: 6,
                type: "visit",
                date: "2024-01-01T15:45:00",
                notes: "برای سفر خرید می‌کرد",
                purchase: "کوله‌پشتی مسافرتی",
                reaction: "positive",
                followup: "ارسال پیشنهادات مسافرتی"
            }
        ]
    },
    {
        id: 7,
        name: "حسن نوری",
        phone: "+98-918-901-2345",
        email: "hasan.nouri@email.com",
        budget: "100-200",
        brands: "نتفلیکس، دیزنی، HBO",
        colors: "آبی، سبز، بنفش",
        lastPurchase: "2023-12-28",
        occasions: "سرگرمی، گیمینگ",
        interactions: [
            {
                id: 7,
                type: "purchase",
                date: "2023-12-28T20:15:00",
                notes: "کنسول بازی می‌خواست",
                purchase: "پلی‌استیشن 5",
                reaction: "very-positive",
                followup: "بررسی رضایت و بازی‌های جدید"
            }
        ]
    },
    {
        id: 8,
        name: "نرگس باقری",
        phone: "+98-919-012-3456",
        email: "narges.bagheri@email.com",
        budget: "200-500",
        brands: "اسپاتیفای، اپل میوزیک، یوتیوب",
        colors: "صورتی، قرمز، نارنجی",
        lastPurchase: "2023-12-25",
        occasions: "مطالعه، آموزش",
        interactions: [
            {
                id: 8,
                type: "call",
                date: "2023-12-25T14:00:00",
                notes: "سرویس موسیقی می‌خواست",
                purchase: "اشتراک اسپاتیفای پریمیوم",
                reaction: "positive",
                followup: "ارسال لیست پلی‌لیست‌های جدید"
            }
        ]
    },
    {
        id: 9,
        name: "رضا طاهری",
        phone: "+98-920-123-4567",
        email: "reza.taheri@email.com",
        budget: "50-100",
        brands: "اوبر، لیفت، درش",
        colors: "مشکی، خاکستری، سفید",
        lastPurchase: "2023-12-22",
        occasions: "ورزش، تناسب اندام",
        interactions: [
            {
                id: 9,
                type: "visit",
                date: "2023-12-22T18:30:00",
                notes: "تجهیزات ورزشی می‌خواست",
                purchase: "دمبل و میز ورزش",
                reaction: "positive",
                followup: "ارسال برنامه‌های ورزشی"
            }
        ]
    },
    {
        id: 10,
        name: "سارا جعفری",
        phone: "+98-921-234-5678",
        email: "sara.jafari@email.com",
        budget: "100-200",
        brands: "ایر بی‌ان‌بی، بوکینگ، اکسپدیا",
        colors: "آبی، سبز، سفید",
        lastPurchase: "2023-12-20",
        occasions: "مسافرت، ماجراجویی",
        interactions: [
            {
                id: 10,
                type: "purchase",
                date: "2023-12-20T12:45:00",
                notes: "رزرو هتل می‌خواست",
                purchase: "رزرو هتل 5 ستاره",
                reaction: "very-positive",
                followup: "ارسال پیشنهادات مقاصد جدید"
            }
        ]
    },
    {
        id: 11,
        name: "امیر مظاهری",
        phone: "+98-922-345-6789",
        email: "amir.mazaheri@email.com",
        budget: "200-500",
        brands: "پی‌پال، ونمو، اسکوئر",
        colors: "آبی، سفید، خاکستری",
        lastPurchase: "2023-12-18",
        occasions: "کار، تجارت",
        interactions: [
            {
                id: 11,
                type: "inquiry",
                date: "2023-12-18T10:00:00",
                notes: "سیستم پرداخت آنلاین می‌خواست",
                purchase: "",
                reaction: "neutral",
                followup: "ارسال اطلاعات فنی"
            }
        ]
    },
    {
        id: 12,
        name: "لیلا رضوانی",
        phone: "+98-923-456-7890",
        email: "leila.rezvani@email.com",
        budget: "50-100",
        brands: "اینستاگرام، تیک‌تاک، اسنپ‌چت",
        colors: "صورتی، بنفش، قرمز",
        lastPurchase: "2023-12-15",
        occasions: "مهمانی، جشن",
        interactions: [
            {
                id: 12,
                type: "visit",
                date: "2023-12-15T16:20:00",
                notes: "لوازم آرایش می‌خواست",
                purchase: "ست آرایش کامل",
                reaction: "very-positive",
                followup: "ارسال محصولات جدید"
            }
        ]
    },
    {
        id: 13,
        name: "مجید شریفی",
        phone: "+98-924-567-8901",
        email: "majid.sharifi@email.com",
        budget: "100-200",
        brands: "لینکدین، توییتر، ردیت",
        colors: "آبی، سفید، مشکی",
        lastPurchase: "2023-12-12",
        occasions: "کار، تجارت",
        interactions: [
            {
                id: 13,
                type: "call",
                date: "2023-12-12T11:30:00",
                notes: "نرم‌افزار مدیریت شبکه‌های اجتماعی می‌خواست",
                purchase: "اشتراک Hootsuite",
                reaction: "positive",
                followup: "آموزش استفاده از پلتفرم"
            }
        ]
    },
    {
        id: 14,
        name: "مینا کاظمی",
        phone: "+98-925-678-9012",
        email: "mina.kazemi@email.com",
        budget: "200-500",
        brands: "زوم، اسلک، مایکروسافت تیمز",
        colors: "آبی، سبز، سفید",
        lastPurchase: "2023-12-10",
        occasions: "کار، تجارت",
        interactions: [
            {
                id: 14,
                type: "purchase",
                date: "2023-12-10T09:15:00",
                notes: "نرم‌افزار ویدیو کنفرانس می‌خواست",
                purchase: "اشتراک زوم پرو",
                reaction: "very-positive",
                followup: "آموزش ویژگی‌های پیشرفته"
            }
        ]
    },
    {
        id: 15,
        name: "حسین مرادی",
        phone: "+98-926-789-0123",
        email: "hossein.moradi@email.com",
        budget: "50-100",
        brands: "ادوبی، کانوا، فیگما",
        colors: "نارنجی، قرمز، زرد",
        lastPurchase: "2023-12-08",
        occasions: "مطالعه، آموزش",
        interactions: [
            {
                id: 15,
                type: "visit",
                date: "2023-12-08T14:45:00",
                notes: "نرم‌افزار طراحی می‌خواست",
                purchase: "اشتراک ادوبی کریتیو",
                reaction: "positive",
                followup: "ارسال آموزش‌های طراحی"
            }
        ]
    },
    {
        id: 16,
        name: "نازنین فرهادی",
        phone: "+98-927-890-1234",
        email: "nazanin.farahadi@email.com",
        budget: "100-200",
        brands: "شاپیفای، ووکامرس، مگنتو",
        colors: "سبز، سفید، آبی",
        lastPurchase: "2023-12-05",
        occasions: "کار، تجارت",
        interactions: [
            {
                id: 16,
                type: "purchase",
                date: "2023-12-05T13:20:00",
                notes: "پلتفرم فروش آنلاین می‌خواست",
                purchase: "اشتراک شاپیفای",
                reaction: "very-positive",
                followup: "آموزش راه‌اندازی فروشگاه"
            }
        ]
    },
    {
        id: 17,
        name: "علی‌رضا صالحی",
        phone: "+98-928-901-2345",
        email: "alireza.salehi@email.com",
        budget: "200-500",
        brands: "سیلزفورس، هاب‌اسپات، پایپ‌درایو",
        colors: "آبی، سفید، خاکستری",
        lastPurchase: "2023-12-03",
        occasions: "کار، تجارت",
        interactions: [
            {
                id: 17,
                type: "call",
                date: "2023-12-03T10:45:00",
                notes: "سیستم CRM می‌خواست",
                purchase: "اشتراک هاب‌اسپات",
                reaction: "positive",
                followup: "آموزش مدیریت مشتریان"
            }
        ]
    },
    {
        id: 18,
        name: "فریبا قاسمی",
        phone: "+98-929-012-3456",
        email: "fariba.ghasemi@email.com",
        budget: "50-100",
        brands: "میل‌چیمپ، کنستانت کانتکت، سندگرید",
        colors: "صورتی، قرمز، نارنجی",
        lastPurchase: "2023-12-01",
        occasions: "کار، تجارت",
        interactions: [
            {
                id: 18,
                type: "visit",
                date: "2023-12-01T15:30:00",
                notes: "سرویس ایمیل مارکتینگ می‌خواست",
                purchase: "اشتراک میل‌چیمپ",
                reaction: "positive",
                followup: "آموزش طراحی کمپین‌های ایمیل"
            }
        ]
    },
    {
        id: 19,
        name: "محسن اکبری",
        phone: "+98-930-123-4567",
        email: "mohsen.akbari@email.com",
        budget: "100-200",
        brands: "وردپرس، ویکس، اسکوئرزپیس",
        colors: "آبی، سفید، خاکستری",
        lastPurchase: "2023-11-28",
        occasions: "مطالعه، آموزش",
        interactions: [
            {
                id: 19,
                type: "purchase",
                date: "2023-11-28T12:15:00",
                notes: "پلتفرم ساخت وبسایت می‌خواست",
                purchase: "اشتراک وردپرس پریمیوم",
                reaction: "very-positive",
                followup: "آموزش طراحی وبسایت"
            }
        ]
    },
    {
        id: 20,
        name: "زینب موسوی",
        phone: "+98-931-234-5678",
        email: "zeynab.mousavi@email.com",
        budget: "200-500",
        brands: "گوچی، پرادا، لویی ویتون",
        colors: "طلایی، نقره‌ای، مشکی",
        lastPurchase: "2023-11-25",
        occasions: "عروسی، سالگرد",
        interactions: [
            {
                id: 20,
                type: "visit",
                date: "2023-11-25T17:00:00",
                notes: "جواهرات لوکس می‌خواست",
                purchase: "گردنبند طلا و الماس",
                reaction: "very-positive",
                followup: "ارسال کالکشن جواهرات جدید"
            }
        ]
    }
];

// Export the predefined customers data
window.predefinedCustomers = predefinedCustomers;
