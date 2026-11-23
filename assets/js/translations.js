/* UI copy translations grounded in the RU/EN Figma dashboards. Numbers and model names are preserved. */
(() => {
  const pairs = [
    ['ДИЗАЙН','DESIGN'],['Дашборд','Dashboard'],['Подробная аналитика / данные Ozon и Figma','Detailed analytics / Ozon and Figma data'],['1. Что сделала','1. Work'],['2. Достижения','2. Achievements'],['3. Проблемы','3. Challenges'],['4. Планы','4. Plans'],
    ['5. Аналитика','5. Analytics'],['Подробная аналитика','Detailed analytics'],['Открыть аналитику','Explore the analytics'],['Подробности','Details'],
    ['Аттестация дизайнера','Designer performance review'],['Аттестация','Performance review'],['Аттестация / Блок 1 из 4','Performance review / Part 1 of 4'],
    ['Аттестация / Блок 2 из 4','Performance review / Part 2 of 4'],['Аттестация / Блок 3 из 4','Performance review / Part 3 of 4'],['Аттестация / Блок 4 из 4','Performance review / Part 4 of 4'],
    ['Что я сделала','What I delivered'],['Мои достижения','My achievements'],['Проблемы и как я их решаю','Challenges and my approach'],['Планы на 2027 год','Plans for 2027'],
    ['Весь период','Full period'],['Июль – август','July – August'],['Июль и август','July and August'],['Июль','July'],['Август','August'],['Сентябрь','September'],['Октябрь','October'],['Ноябрь','November'],['Реклама','Advertising'],
    ['Итоги','Summary'],['Библиотека: до и после','Library: before / after'],['Посещения','Visits'],['Показы','Impressions'],['Библиотека компонентов: до и после','Component library: before and after'],
    ['Поделиться','Share'],['Скопировать ссылку на раздел','Copy link to this view'],['Скачать данные раздела в CSV','Download this view as CSV'],['CSV-отчёт сохранён','CSV report downloaded'],['Ссылка на раздел скопирована','Link copied'],
    ['Вкладки раздела','Section tabs'],['Ссылка:','Link:'],['Начало аттестации дизайнера','Start performance review'],
    ['Карточек товара','Product cards'],['Карточек за 2 месяца','Cards in 2 months'],['Карточек за месяц','Cards this month'],['Карточек в месячном блоке','Cards in monthly section'],['Карточек','Cards'],
    ['Рекламных макетов','Ad layouts'],['Макетов всего','Total layouts'],['Макетов','Layouts'],['Брендзоны на маркетплейсах','Marketplace brand zones'],['Брендбук Orium','Orium brand book'],
    ['4 кампании','4 campaigns'],['июль — октябрь','July – October'],['июль + август','July + August'],['страниц · фирменный стиль с нуля','pages · visual identity from scratch'],
    ['Ozon 18 · Яндекс Маркет 17 макетов','Ozon 18 · Yandex Market 17 layouts'],['Карточки по месяцам','Cards by month'],['Как рос объём','Production growth'],
    ['Страница «Согласованные» в Figma, месячные блоки','Figma Approved page, grouped by month'],['Карточек в каждом блоке и изменение к прошлому','Cards per month and month-over-month change'],
    ['3:4 вертикальные','3:4 portrait'],['1:1 квадратные','1:1 square'],['Вертикальные 3:4','Portrait 3:4'],['Квадратные 1:1','Square 1:1'],['Вертикальные / квадратные','Portrait / square'],
    ['основная воронка','Core product sequence'],['из тех же компонентов','From the same components'],['Форматы карточек','Card formats'],['1 190 карточек','1,190 cards'],['869 карточек','869 cards'],
    ['Рекламные кампании','Ad campaigns'],['Баннеры','Banners'],['Промообложки 3:4','3:4 promo covers'],['Баннеры и промообложки','Banners and promo covers'],['Макеты по кампаниям','Layouts by campaign'],
    ['почти ×2','Nearly ×2'],['В среднем','Average'],['карточек в месяц','cards per month'],['SKU на Ozon','SKUs on Ozon'],['SKU с моими карточками на Ozon','Ozon SKUs using my product cards'],
    ['с моими карточками в июле','with my cards in July'],['с моими карточками','with my product cards'],['старт','Start'],['июль → октябрь','July → October'],
    ['Июль – август: старт','July – August: getting started'],['Сентябрь: рывок','September: production leap'],['Октябрь: темп удержан','October: pace maintained'],
    ['Август к июлю: +31,5%','August vs July: +31.5%'],['+697,5% к августу','+697.5% vs August'],['−8,7% к сентябрю — уровень сохранён','−8.7% vs September; output remains strong'],
    ['Как я работала','How I worked'],['Что было до системы','Before the system'],['Что нового в работе','New in my workflow'],['Библиотека компонентов','Component library'],['запуск системы','System launch'],
    ['Модели в работе','Models in progress'],['воронка + квадратные','Sequence + square cards'],['воронка + общие карточки','Sequence + shared cards'],['воронка + правки','Sequence + revisions'],
    ['нейрофотосессия · 2 цвета','AI photo session · 2 colors'],['нейрофото · все цвета','AI photos · all colors'],['в работе с 02.10','In progress since Oct 2'],
    ['Сентябрь и октябрь по форматам','September and October by format'],['Итог двух месяцев на библиотеке','Two months with the component library'],
    ['было 2','Previously 2'],['Квадратных 1:1','1:1 square cards'],['~107 в месяц','~107 per month'],['~923 в месяц','~923 per month'],
    ['Хэллоуин','Halloween'],['20 серий × 9 размеров','20 sets × 9 sizes'],['вкл. 22 промообложки 3:4','incl. 22 promo covers 3:4'],
    ['Пять форматов, px · 107 баннеров','Five sizes, px · 107 banners'],['11.11 — баннеры по размерам','11.11 banners by size'],['50,3% всех макетов','50.3% of all layouts'],
    ['До · 2 месяца','Before · 2 months'],['После · 2 месяца','After · 2 months'],['До библиотеки','Before the library'],['После библиотеки','After the library'],
    ['Рост выпуска','Production growth'],['во столько раз больше карточек за тот же срок','times as many cards over the same period'],['за тот же срок','over the same period'],
    ['Показы в поиске','Search impressions'],['Показы всего','Total impressions'],['Посещения карточек','Product-card visits'],['рост тоже есть','Also increasing'],
    ['Посещения карточек · сентябрь → ноябрь','Product-card visits · September → November'],['Обновлённые','Updated'],['Без обновления','Not updated'],['Обновлённые модели','Updated models'],
    ['Обновлённый контент','Updated content'],['Обновлённый контент → посещения','Updated content → visits'],['Показы обновлённых','Updated: impressions'],['Показы без обновления','Not updated: impressions'],
    ['посещения: 5 749 → 8 462','visits: 5,749 → 8,462'],['посещения: 1 974 → 1 282','visits: 1,974 → 1,282'],
    ['почти как у остальных','Nearly matching the other group'],['Посещения за неделю','Weekly visits'],['Сентябрь → ноябрь','September → November'],
    ['Сентябрь и ноябрь','September and November'],['14–20 сентября','September 14–20'],['9–15 ноября','November 9–15'],
    ['Какие модели в группах','Models by group'],['Обновлённый контент · 7 моделей','Updated content · 7 models'],['Без обновления · 3 модели','Not updated · 3 models'],
    ['Показы и посещения магазина','Store impressions and visits'],['Показы в поиске по категориям','Search impressions by category'],['Зубные щётки','Toothbrushes'],
    ['Фены','Hair dryers'],['Бритвы и шейверы','Razors and shavers'],['октябрь к сентябрю','October vs September'],['Неделя сентября и неделя октября','One week in September vs October'],
    ['ДРР','Ad spend/revenue'],['реклама сопоставима','Comparable advertising'],['Почему сентябрь и октябрь','Why September and October'],
    ['Брендзоны и брендбук','Brand zones & brand book'],['Квадратные версии 1:1','Square 1:1 versions'],['до и после библиотеки','before and after library'],['в месяц','per month'],
    ['В месяц','Per month'],['карточек за 2 месяца','cards in 2 months'],['карточек в среднем','cards on average'],['После · 3:4','After · 3:4'],['После · 1:1','After · 1:1'],
    ['Что даёт библиотека','What the library enables'],['Граница — запуск библиотеки 22.09','Milestone: library launched Sep 22'],['22.09 · библиотека компонентов','Sep 22 · component library'],
    ['Проблемы и как я их решаю','Challenges and my approach'],['Эффективность главного фото','Main image performance'],['Приоритет обновления карточек','Card update priorities'],
    ['Столкнулась','Challenge'],['Что уже сделала','What I have done'],['Предлагаю','My proposal'],['✓ уже есть','✓ Available'],['✓ подтверждено','✓ Verified'],
    ['→ в планах','→ Planned'],['Аналитика Ozon','Ozon analytics'],['Измеримый результат','Measurable result'],['Следующий шаг','Next step'],
    ['Планы на 2027 год','Plans for 2027'],['НАПРАВЛЕНИЕ РАЗВИТИЯ · 2027','DEVELOPMENT PRIORITY · 2027'],['ВИЗУАЛ','VISUALS'],['по данным Ozon','guided by Ozon data'],
    ['ТЕСТЫ','TESTING'],['Главные фото','Main product images'],['ОТБОР','PRIORITIES'],['Приоритеты карточек','Card priorities'],['По аналитике и задачам','Based on analytics and tasks'],
    ['ПОКВАРТАЛЬНЫЙ ПЛАН','QUARTERLY ROADMAP'],['2027 · I — IV КВАРТАЛ','2027 · Q1–Q4'],['I КВАРТАЛ','Q1'],['II КВАРТАЛ','Q2'],['III КВАРТАЛ','Q3'],['IV КВАРТАЛ','Q4'],
    ['Подготовка','Preparation'],['Запуск','Launch'],['Применение','Implementation'],['Оценка','Evaluation'],['УЛУЧШЕНИЕ СОП','PROCESS IMPROVEMENT'],['РАЗВИВАЮ','SKILLS TO DEVELOP'],
    ['Обзор','Overview'],['Карточки','Product cards'],['Показы и посещения','Impressions and visits'],['Контент Laifen: объём и результат','Laifen content: output and impact'],
    ['Карточек в Figma','Cards in Figma'],['Посещения, обновлённый контент','Visits to updated content'],['Рекламные макеты по кампаниям','Ad layouts by campaign'],
    ['Карточки товара в Figma','Product cards in Figma'],['Месяц','Month'],['Все месяцы','All months'],['Формат','Format'],['Все','All'],
    ['Все карточки, июль — октябрь','All cards, July – October'],['Динамика объёма контента','Content volume over time'],['Основные выводы','Key takeaways'],
    ['Рекламные кампании в Figma','Ad campaigns in Figma'],['Кампания','Campaign'],['Все кампании','All campaigns'],['Все кампании, макетов всего','All campaigns, total layouts'],
    ['Сравнение объёма контента','Content production comparison'],['Пять форматов, px · всего 107','Five sizes, px · 107 total'],
    ['Трафик карточек на Ozon','Product-card traffic on Ozon'],['Месяцы','Months'],['Показатель','Metric'],['По категориям за неделю','By category, per week'],
    ['Всего по магазину','Store-wide total'],['Неделя каждого месяца','One week per month'],['Показы в поиске и каталоге, за неделю','Weekly impressions in search and catalog'],
    ['Выберите месяц, чтобы увидеть изменение','Select a month to view the change'],['Нет данных по фильтру','No data for this filter'],['Сбросить фильтры','Reset filters'],
    ['Показать детали','See details'],['Поиск','Search'],['Открыть','Open'],['Аналитика','Analytics'],['ИСТОЧНИК','SOURCE'],['ИСТОЧНИК ДАННЫХ','DATA SOURCE'],
    ['Источник: аналитика Ozon','Source: Ozon analytics'],['Подтверждено аналитикой Ozon','Verified in Ozon analytics'],['План, не достигнутый результат','Planned action, not a completed result'],
  ];
  const long = [
    ['Веду визуал бренда Laifen на маркетплейсах: карточки товара, рекламные кампании, брендзоны на Ozon и Яндекс Маркете, брендбук Orium. Период: 20 июля — 19 ноября.', 'I manage Laifen visuals across marketplaces: product cards, ad campaigns, brand zones on Ozon and Yandex Market, and the Orium brand book. July 20 – November 19.'],
    ['Два главных результата: библиотека компонентов ускорила выпуск карточек, а обновлённый контент привёл больше посетителей.','Two key results: faster card production with the component library and more visits to updated product cards.'],
    ['Показы выросли, а посещения — только у обновлённых моделей. Разница — в контенте.','Impressions increased, while visits rose only for updated models. The difference lies in the content.'],
    ['Рост — в том числе за счёт входа в работу в июле–августе и нейрофотосессий вместо съёмки. Но такой объём без системы компонентов был бы невозможен.','Growth also reflects onboarding in July–August and AI imagery replacing shoots. The component system made this volume manageable.'],
    ['Неделя 14–20 сентября → неделя 9–15 ноября. Сравниваю модели, которые обновила, с моделями без обновления.','Sep 14–20 vs Nov 9–15: comparing models I updated with those not updated.'],
    ['Отчёт Ozon «По товарам»: неделя сентября и неделя октября — периоды с сопоставимой рекламой (ДРР 18% и 21%).','Ozon product report: one week in September and one in October, with comparable advertising (18% and 21% ad spend/revenue).'],
    ['Каждая карточка — с нуля, без общих компонентов и шаблонов.','Each card was built from scratch, with no shared components or templates.'],
    ['Почти только вертикальные 3:4: квадратных версий 1:1 — всего 2.','Mostly portrait 3:4 cards; there were only two square 1:1 versions.'],
    ['Отсюда вывод: нужна система. 22 сентября собрала библиотеку компонентов в Figma.','The takeaway: a reusable system was needed. I built the Figma component library on September 22.'],
    ['Квадратные 1:1 собираются из тех же компонентов, что и 3:4: было 2 — стало 867.','Square 1:1 cards use the same components as 3:4: from 2 to 867 cards.'],
    ['Единые сетки, отступы и плашки для всех линеек — бренд выглядит одинаково.','Shared grids, spacing, and labels across product lines keep the brand consistent.'],
    ['Версии под новые цвета модели собираются на тех же макетах.','New color variants reuse the same layouts.'],
    ['Шаблон ТЗ — меньше вопросов на старте задачи.','Creative brief template reduces questions at kickoff.'],
    ['Нейрофотосессии для обложек — без отдельной съёмки','AI-generated cover imagery without a separate shoot'],
    ['Библиотека компонентов и шаблоны в Figma','Component library and templates in Figma'],
    ['Версии карточек под каждый цвет модели','Product-card versions for each model color'],
    ['Шаблон ТЗ — задачи проще согласовывать','Creative brief template to simplify approvals'],
    ['Параллельно: материалы Roborock для сайта и гайдлайны','In parallel: Roborock website visuals and guidelines'],
    ['Темп не просел после первого месяца — значит, ускорение даёт система, а не рывок.','The pace held after the first month, supporting a sustainable production process rather than a one-time spike.'],
    ['Параллельно шёл сезон акций: Хэллоуин, 11.11, Black Friday — см. вкладку «Реклама».','Seasonal campaigns also ran: Halloween, 11.11, and Black Friday. See the Advertising tab.'],
    ['В августе ДРР был 44% — реклама искажает сравнение, поэтому его не беру.','August had 44% ad spend/revenue, which distorts comparison, so I exclude it.'],
    ['В сентябре и октябре реклама сопоставима: ДРР 18% и 21%.','Advertising was comparable in September and October: 18% and 21% ad spend/revenue.'],
    ['Показы зависят от алгоритма Ozon, цен и акций — поэтому главная цифра для меня: посещения.','Impressions also depend on Ozon algorithms, pricing and promotions, so visits are my main metric.'],
    ['Оzon','Ozon'],
    ['Два рабочих вопроса: какое фото эффективнее и какие карточки обновлять в первую очередь.','Two questions: which main image works best, and which cards should be updated first?'],
    ['Визуально сильная обложка не всегда показывает лучший результат.','A visually strong main image does not always perform best.'],
    ['Создавала и обновляла визуальный контент карточек товаров для маркетплейсов.','Created and updated product-card visuals for marketplaces.'],
    ['Предлагаю начать с пилотных тестов в I квартале, затем регулярно сравнивать обложки.','I propose pilot tests in Q1, then regular comparisons of main images.'],
    ['При большом каталоге важно понимать, какие карточки обновлять первыми.','With a large catalog, choosing which cards to update first matters.'],
    ['За отчётный период подготовила 2 059 карточек для разных моделей и форматов.','Produced 2,059 cards for various models and formats during the review period.'],
    ['Утвердить критерии отбора: показы, посещения и потенциал улучшения.','Agree on selection criteria: impressions, visits, and improvement potential.'],
    ['источник данных по показам и посещениям','Source of impressions and visit data'],
    ['+47,2% посещений у обновлённых моделей','+47.2% visits for updated models'],
    ['Предложить тесты фото и критерии отбора карточек.','Propose image tests and card selection criteria.'],
    ['Цель — проверить, какие обложки работают лучше, и выбирать приоритетные карточки по данным Ozon.','Goal: identify effective main images and prioritize updates using Ozon data.'],
    ['Методика → пилот → регулярная оценка','Method → pilot → regular evaluation'],
    ['Частоту определить после пилота','Set frequency after the pilot'],
    ['Метрики, критерии отбора, пилот фото','Metrics, selection criteria, image pilot'],
    ['Тестировать обложки по согласованной методике','Test main images using an agreed method'],
    ['Обновлять карточки по результатам проверок','Update cards based on test results'],
    ['Подвести итоги и предложить улучшения СОП','Review outcomes and propose process improvements'],
    ['Данные Ozon → приоритет → проверка → вывод','Ozon data → priorities → test → conclusion'],
    ['Аналитику и тестирование визуала','Analytics and visual testing'],
    ['89,6% всех карточек — в сентябре и октябре, после запуска библиотеки.','89.6% of all cards were created in September and October, after the library launch.'],
    ['Накопленный объём по этапам: 92 → 213 → 1 178 → 2 059.','Cumulative output: 92 → 213 → 1,178 → 2,059.'],
    ['Число макетов не равно числу уникальных дизайнов: одна концепция адаптируется под несколько размеров.','The number of layouts is not the number of unique concepts: one design is adapted to several sizes.'],
  ];

  const additional=[
    ['20.07 – 20.09 · первые два месяца. Вхожу в работу, карточки собираю вручную — библиотеки компонентов ещё нет.','Jul 20 – Sep 20 · my first two months. I was onboarding and manually assembling cards before the component library existed.'],
    ['21.09 – 19.10 · работаю на библиотеке компонентов. Выпуск вырос почти в 8 раз к августу, для моделей появились квадратные версии.','Sep 21 – Oct 19 · using the component library. Output grew almost eightfold versus August, with new square variants.'],
    ['Часы на воронку модели по моему журналу, 22.09 – 07.10','Hours per model sequence from my work log, Sep 22 – Oct 7'],
    ['~7 ч','~7 hrs'],['~10 ч','~10 hrs'],['~11,5 ч','~11.5 hrs'],['~20,5 ч','~20.5 hrs'],['~21,5 ч','~21.5 hrs'],['~8 ч','~8 hrs'],
    ['Воронки стали сложнее: версии под каждый цвет и нейрофотосессии вместо съёмки.','Product sequences became more complex: color-specific versions and AI imagery instead of conventional shoots.'],
    ['20.10 – 19.11 · объём остался на уровне сентября — библиотека работает не разово, а как система.','Oct 20 – Nov 19 · output remained near September levels, showing the library supports ongoing production.'],
    ['Всего','Total'],
    ['885 макетов для четырёх кампаний. Каждый размер и креативный вариант — отдельный макет.','885 layouts across four campaigns. Each format and creative variation is counted separately.'],
    ['20 серий по 9 размеров — один комплект форматов для разных товаров и сюжетов.','20 series across 9 sizes: one consistent format set for different products and creative concepts.'],
    ['Десктоп и мобильная версия бренд-зоны, категорийные форматы.','Desktop and mobile brand-zone versions, plus category placements.'],
    ['Яндекс Директ, светлые и тёмные стили, бренд-зоны, включая рабочие варианты.','Yandex Direct, light and dark styles, brand zones and working versions.'],
    ['Баннеры и промообложки 900×1200, концепции Vintage Style и New Year Poster.','Banners and 900×1200 promo covers, Vintage Style and New Year Poster concepts.'],
    ['Баннеры и промообложки 900×1200, концепции Vintage Style и New Year Post.','Banners and 900×1200 promo covers, Vintage Style and New Year Post concepts.'],
    ['Библиотека компонентов в Figma · с 22.09','Figma component library · since Sep 22'],
    ['у моделей с обновлённым контентом','for models with updated content'],
    ['макетов брендзон · страниц Orium','brand-zone layouts · Orium pages'],
    ['Запустила 22 сентября. Сравниваю два месяца до (20.07 – 20.09) и два месяца после (21.09 – 19.11) по месячным блокам в Figma.','Launched September 22. Comparing two months before (Jul 20 – Sep 20) and after (Sep 21 – Nov 19) using monthly Figma sections.'],
    ['Объём контента в Figma и трафик карточек на Ozon с 20 июля.','Figma content output and Ozon product-card traffic since July 20.'],
    ['Макеты в месячных блоках страницы «Согласованные»','Layouts in the monthly sections of the Approved page'],
    ['Каждый размер и креативный вариант — отдельный макет','Each size and creative variant counts as a separate layout'],
    ['За четыре месяца — 2 059 карточек, 89,6% из них сделаны в сентябре и октябре. Рекламных макетов — 885, на Black Friday пришлось 50,3%.','Over four months: 2,059 cards, 89.6% made in September–October; 885 ad layouts, 50.3% for Black Friday.'],
    ['Страница «Согласованные»: видимые карточки в четырёх месячных блоках, без баннеров, скрытых макетов и секции «Мусор».','Approved page: visible cards in four monthly sections, excluding banners, hidden layouts and Trash.'],
    ['57,8% за весь период','57.8% over the full period'],['42,2% за весь период','42.2% over the full period'],
    ['Количество карточек в каждом месячном блоке','Number of cards in each monthly section'],
    ['Июль–август: небольшой объём — 213 карточек за два этапа.','July–August: initial output of 213 cards in two stages.'],
    ['Сентябрь: резкий рост до 965 карточек (+697,5%), появляется большой массив квадратных форматов 1:1.','September: sharp growth to 965 cards (+697.5%), including many square 1:1 versions.'],
    ['Октябрь: 881 карточка (−8,7%) — чуть меньше, но близко к сентябрю.','October: 881 cards (−8.7%), slightly lower but near September levels.'],
    ['Готовые рекламные макеты на четырёх страницах файла «Реклама». Каждый размер и креативный вариант — отдельный макет.','Completed ad layouts across four pages of the Advertising file. Each size and creative version counts separately.'],
    ['адаптации под размеры','Adapted to sizes'],['промоформат','Promo format'],['выбранный набор','Selected campaign'],
    ['Отчёт Ozon «По товарам», по одной полной неделе в сентябре и октябре — периоды с сопоставимой рекламой (ДРР 18% и 21%).','Ozon product report, one full week in September and October with comparable advertising (18% and 21% ad spend/revenue).'],
    ['неделя сентября','week in September'],['неделя октября','week in October'],
    ['Сентябрь · 14.09–20.09: 112 647 показов в поиске, ДРР 18%.','September · Sep 14–20: 112,647 search impressions, ad spend/revenue 18%.'],
    ['Октябрь · 26.10–01.11: 222 131 показ в поиске, ДРР 21%.','October · Oct 26–Nov 1: 222,131 search impressions, ad spend/revenue 21%.'],
    ['Показы в поиске, октябрь к сентябрю: ×1,97. Показы зависят от алгоритма Ozon, цен, акций и рекламы.','Search impressions, October vs September: ×1.97. Results also depend on Ozon algorithms, prices, promotions and ads.'],
    ['Посещения карточек: обновлённый контент и без обновления','Product-card visits: updated versus not updated'],
    ['Неделя 14–20 сентября → неделя 9–15 ноября','Week of Sep 14–20 → week of Nov 9–15'],
    ['Показы выросли у обеих групп почти одинаково, а посещения — только у моделей с обновлённым контентом. Без обновления: P3 Pro Giftbox, Wave, T1 Pro Giftbox.','Impressions rose similarly in both groups, but visits increased only for updated models. Not updated: P3 Pro Giftbox, Wave, T1 Pro Giftbox.'],
  ];
  const dict=new Map([...pairs,...long,...additional].map(([a,b])=>[a.replace(/\s+/g,' ').trim(),b]));
  const defaultUi=(key,lang)=>lang==='en'?(dict.get(key)||key):key;
  function translateText(text){
    const norm=text.replace(/\s+/g,' ').trim();
    if(!norm)return text;
    const mapped=dict.get(norm);
    if(mapped!==undefined)return text.replace(norm,mapped);
    let newText=text;
    // Safe reusable translations of fixed text segments; don't replace numbers or model names.
    const fragments=[
      [/Аттестация \/ Блок (\d) из 4/g,'Performance review / Part $1 of 4'],
      [/сентябрь/gi,'September'],[/октябрь/gi,'October'],[/ноябрь/gi,'November'],[/август/gi,'August'],[/июль/gi,'July'],
      [/показы/gi,'impressions'],[/посещения/gi,'visits'],[/карточек/gi,'cards'],[/макетов/gi,'layouts'],[/баннеров/gi,'banners'],
      [/моделей/gi,'models'],[/без обновления/gi,'not updated'],[/обновлённых/gi,'updated'],[/реклама/gi,'advertising'],
      [/неделя/gi,'week'],[/кампании/gi,'campaigns'],[/отдельный/gi,'separate'],[/на Ozon/gi,'on Ozon'],
    ];
    for(const [re,to] of fragments)newText=newText.replace(re,to);
    newText=newText.replace(/(\d),(\d)/g,'$1.$2');
    return newText;
  }
  function localizeDOM(root,lang){
    if(lang!=='en')return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let n;while((n=walker.nextNode())){
      if(!n.parentElement||n.parentElement.closest('script,style,svg'))continue;
      n.textContent=translateText(n.textContent);
    }
    for(const e of root.querySelectorAll('[aria-label],[title],[data-tip],[placeholder]')){
      for(const attr of ['aria-label','title','data-tip','placeholder']){
        const val=e.getAttribute(attr);if(val && /[а-яё]/i.test(val))e.setAttribute(attr,translateText(val));
      }
    }
  }
  window.SITE_I18N={dict,translateText,localizeDOM,t:defaultUi};
})();
