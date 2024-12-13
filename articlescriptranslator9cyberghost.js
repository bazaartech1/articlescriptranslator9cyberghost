
    document.addEventListener("DOMContentLoaded", function() {
        // تحميل الترجمات من ملف JSON على GitHub
        fetch('https://raw.githubusercontent.com/bazaartech1/article13cyberghostvpn/refs/heads/main/article13cyberghostvpn.json')
            .then(response => response.json())
            .then(data => {
                // الحصول على موقع الزائر باستخدام ipinfo.io
                fetch('https://ipinfo.io/json?token=7026faa1150bfd')
                    .then(response => response.json())
                    .then(ipData => {
                        var userCountry = ipData.country;
                        var userLang;
                   
                        if (['MA', 'SA', 'AE', 'DZ', 'TN', 'KW', 'QA', 'OM', 'BH', 'EG', 'IQ', 'SY', 'JO', 'LB', 'PS', 'LY', 'SD', 'DJ', 'SO',  'SS'].includes(userCountry)) {
                            userLang = 'ar'; 
                        } else if (['CR', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'GT', 'EC', 'BO', 'PY', 'UY', 'CU', 'DO', 'SV', 'NI', 'HN', 'PR', 'GQ', 'PA', 'ES'].includes(userCountry)) {
                            userLang = 'es'; 
                        } else if (['US', 'GB', 'CA', 'AU', 'IE', 'NZ', 'ZA', 'IN', 'NG', 'PK', 'PH', 'SG', 'JM', 'MT', 'BB', 'TT', 'GH', 'ZM', 'BS', 'BZ', 'GD', 'HN', 'KN', 'LC', 'VC', 'SL', 'MW', 'ZW', 'KE', 'UG', 'SS', 'MU', 'MV', 'FJ', 'MM', 'NP', 'KR', 'JP', 'IL', 'HK', 'ET', 'ER', 'CY', 'BN', 'AO', 'BD', 'VU', 'TZ', 'LK', 'SC', 'WS', 'LC', 'KN', 'RW', 'DK', 'NO', 'RU', 'TR', 'IT', 'DE', 'NL', 'TH', 'BY', 'HR', 'AT', 'BG', 'RO', 'FI', 'IS', 'KZ', 'DM', 'GY', 'VG', 'TV'].includes(userCountry)) {
                            userLang = 'en'; 
                        } else if (['FR', 'CD', 'BE', 'CH', 'LU', 'CI', 'SN', 'CM', 'GN', 'BF', 'NE', 'TD', 'CF', 'RW', 'NC', 'CK', 'BJ', 'BI', 'KM', 'CG', 'ML', 'SC'].includes(userCountry)) {
                            userLang = 'fr'; 
                        } else {
                            userLang = 'ar'; 
                        }

                        // تحديد المقال الحالي
                        var currentArticle = "article13"; // تأكد من تغيير هذا المعرف بناءً على المقال الحالي

                        // استبدال العنوان والمحتوى بالمحتوى المناسب من JSON
                        if (data[userLang] && data[userLang][currentArticle]) {
                            document.querySelector('.article-title').textContent = data[userLang][currentArticle].title;
                            
                            // تجهيز المحتوى المتعدد الأقسام
                            let contentHtml = '';
                            data[userLang][currentArticle].sections.forEach(section => {
                                contentHtml += `<h3>${section.title}</h3>`;
                                if (Array.isArray(section.content)) {
                                    section.content.forEach(contentItem => {
                                        contentHtml += `<p>${contentItem}</p>`;
                                    });
                                } else {
                                    contentHtml += `<p>${section.content}</p>`;
                                }
                            });
                            document.querySelector('.article-content').innerHTML = contentHtml;
                        } else {
                            // عرض رسالة عند عدم توفر الترجمة
                            document.querySelector('.article-title').textContent = 'Translation not available';
                            document.querySelector('.article-content').innerHTML = '<p>No content available in this language.</p>';
                        }
                    })
                    .catch(error => console.error('فشل في الحصول على بيانات IP:', error));
            })
            .catch(error => console.error('فشل في تحميل ملف الترجمة:', error));
    });
