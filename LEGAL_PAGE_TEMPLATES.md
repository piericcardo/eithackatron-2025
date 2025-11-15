# Legal Page Templates for AquaPure

## How to Use These Templates

1. Replace `[COMPANY_NAME]` with your actual company name
2. Replace `[ADDRESS]` with your business address
3. Replace `[EMAIL]` with your contact email
4. Replace `[PHONE]` with your phone number
5. Replace `[DATE]` with current date
6. Review with a lawyer before publishing (these are templates only)

---

## Privacy Policy Template

### File Structure
Create: `src/app/privacy/page.tsx`

```typescript
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-900">AquaPure</span>
            </Link>
            <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Начало
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Политика за Поверителност
        </h1>
        <p className="text-gray-600 mb-8">
          Последна актуализация: [DATE]
        </p>

        <div className="prose prose-blue max-w-none space-y-6">
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              1. Обща Информация
            </h2>
            <p className="text-gray-700">
              [COMPANY_NAME] ("ние", "нас", "нашият") зачита вашата поверителност и се ангажира да защитава 
              вашите лични данни. Тази политика за поверителност ви информира как се грижим за вашите лични 
              данни, когато посещавате нашия уебсайт и ви информира за вашите права относно поверителността.
            </p>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              2. Данни, Които Събираме
            </h2>
            <p className="text-gray-700 mb-3">
              Ние може да събираме, използваме, съхраняваме и прехвърляме различни видове лични данни за вас:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Данни за идентичност:</strong> име, фамилия</li>
              <li><strong>Данни за контакт:</strong> имейл адрес, телефонен номер, адрес за доставка</li>
              <li><strong>Технически данни:</strong> IP адрес, тип браузър, часова зона</li>
              <li><strong>Данни за използване:</strong> информация как използвате нашия сайт</li>
              <li><strong>Данни за поръчки:</strong> информация за вашите покупки</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              3. Как Използваме Вашите Данни
            </h2>
            <p className="text-gray-700 mb-3">
              Използваме вашите лични данни за следните цели:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Обработка и доставка на вашите поръчки</li>
              <li>Управление на вашия акаунт</li>
              <li>Комуникация с вас относно поръчки и услуги</li>
              <li>Подобряване на нашия уебсайт и услуги</li>
              <li>Маркетингови комуникации (с вашето съгласие)</li>
              <li>Предоставяне на информация за качеството на водата в вашия район</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              4. Сигурност на Данните
            </h2>
            <p className="text-gray-700">
              Ние сме внедрили подходящи мерки за сигурност, за да предотвратим случайна загуба, 
              използване или достъп до вашите лични данни по неразрешен начин. Достъпът до вашите 
              лични данни е ограничен до служители, които имат бизнес необходимост.
            </p>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              5. Вашите Права
            </h2>
            <p className="text-gray-700 mb-3">
              Съгласно GDPR, имате право на:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Право на достъп:</strong> да поискате копие от вашите лични данни</li>
              <li><strong>Право на коригиране:</strong> да поискате коригиране на неточни данни</li>
              <li><strong>Право на изтриване:</strong> да поискате изтриване на вашите данни</li>
              <li><strong>Право на ограничаване:</strong> да поискате ограничаване на обработката</li>
              <li><strong>Право на преносимост:</strong> да получите вашите данни в структуриран формат</li>
              <li><strong>Право на възражение:</strong> да възразите срещу обработката на вашите данни</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              6. Бисквитки
            </h2>
            <p className="text-gray-700">
              Нашият сайт използва бисквитки за подобряване на вашето потребителско изживяване. 
              Вижте нашата <Link href="/cookies" className="text-blue-600 hover:underline">
              Политика за Бисквитки</Link> за повече информация.
            </p>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              7. Контакти
            </h2>
            <p className="text-gray-700 mb-3">
              Ако имате въпроси относно тази политика или желаете да упражните вашите права, 
              моля свържете се с нас:
            </p>
            <div className="text-gray-700 space-y-1">
              <p><strong>Имейл:</strong> [EMAIL]</p>
              <p><strong>Телефон:</strong> [PHONE]</p>
              <p><strong>Адрес:</strong> [ADDRESS]</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t mt-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-6">
          <p className="text-sm text-gray-600 text-center">
            © 2024 AquaPure. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}
```

---

## Terms of Service Template

### File Structure
Create: `src/app/terms/page.tsx`

```typescript
// Similar structure to Privacy Policy, but with TOS content:

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    1. Приемане на Условията
  </h2>
  <p className="text-gray-700">
    Чрез достъп и използване на този уебсайт, вие приемате да спазвате тези общи условия. 
    Ако не се съгласявате с някоя част от тези условия, моля не използвайте нашия сайт.
  </p>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    2. Описание на Услугите
  </h2>
  <p className="text-gray-700">
    AquaPure предлага:
  </p>
  <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li>Продажба на премиум пречистена вода в алуминиеви кутии</li>
    <li>Информация за качеството на водата по квартали във Варна</li>
    <li>Услуги по доставка на вода</li>
    <li>Консултации относно качеството на водата</li>
  </ul>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    3. Поръчки и Плащания
  </h2>
  <p className="text-gray-700 mb-3">
    При направа на поръчка, вие се съгласявате да:
  </p>
  <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li>Предоставите точна информация за доставка</li>
    <li>Заплатите пълната цена на продуктите</li>
    <li>Приемете продуктите при доставка</li>
  </ul>
  <p className="text-gray-700 mt-3">
    Всички цени са в евро (€) и включват ДДС. Заплащането се извършва чрез [payment methods].
  </p>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    4. Доставка
  </h2>
  <p className="text-gray-700">
    Доставяме до адреси във Варна и региона. Стандартното време за доставка е 1-3 работни дни. 
    Безплатна доставка за поръчки над [amount]€.
  </p>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    5. Връщане и Възстановяване
  </h2>
  <p className="text-gray-700">
    Имате право на връщане на продукти в рамките на 14 дни от доставката, съгласно 
    Закона за защита на потребителите. Продуктите трябва да бъдат неотворени и в 
    оригиналната опаковка.
  </p>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    6. Информация за Качеството на Водата
  </h2>
  <p className="text-gray-700">
    Информацията за качеството на водата, предоставена на нашия сайт, е за информационни 
    цели и се основава на наши собствени изследвания. Не носим отговорност за решения, 
    взети на базата на тази информация.
  </p>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    7. Ограничение на Отговорността
  </h2>
  <p className="text-gray-700">
    AquaPure не носи отговорност за:
  </p>
  <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li>Непреки щети или загуби</li>
    <li>Забавяния в доставката поради форсмажорни обстоятелства</li>
    <li>Грешки в предоставената информация за качеството на водата</li>
  </ul>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    8. Изменения на Условията
  </h2>
  <p className="text-gray-700">
    Запазваме правото да променяме тези условия по всяко време. Промените влизат в сила 
    веднага след публикуването им на сайта.
  </p>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    9. Приложимо Право
  </h2>
  <p className="text-gray-700">
    Тези условия се регулират от законите на Република България. Всички спорове подлежат 
    на разглеждане от компетентните български съдилища.
  </p>
</section>
```

---

## Cookies Policy Template

### File Structure
Create: `src/app/cookies/page.tsx`

```typescript
// Similar structure with cookies-specific content:

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    1. Какво са Бисквитките?
  </h2>
  <p className="text-gray-700">
    Бисквитките са малки текстови файлове, които се съхраняват на вашето устройство 
    (компютър, таблет или телефон), когато посещавате уебсайт. Те помагат на сайта 
    да запомни вашите предпочитания и да подобри вашето потребителско изживяване.
  </p>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    2. Какви Бисквитки Използваме?
  </h2>
  
  <div className="space-y-4">
    <div>
      <h3 className="font-semibold text-blue-800 mb-2">
        Строго Необходими Бисквитки
      </h3>
      <p className="text-gray-700">
        Тези бисквитки са необходими за функционирането на сайта и не могат да бъдат 
        изключени. Включват бисквитки за сигурност и достъп до защитени области.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-blue-800 mb-2">
        Функционални Бисквитки
      </h3>
      <p className="text-gray-700">
        Позволяват на сайта да запомни избори, които правите (като име, език) и 
        предоставят подобрени, по-персонализирани функции.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-blue-800 mb-2">
        Аналитични Бисквитки
      </h3>
      <p className="text-gray-700">
        Помагат ни да разберем как посетителите взаимодействат със сайта, като 
        събират и докладват информация анонимно.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-blue-800 mb-2">
        Маркетингови Бисквитки
      </h3>
      <p className="text-gray-700">
        Използват се за проследяване на посетители между различни сайтове и за 
        показване на реклами, които са релевантни за вас.
      </p>
    </div>
  </div>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    3. Как да Контролирате Бисквитките?
  </h2>
  <p className="text-gray-700 mb-3">
    Можете да контролирате и/или изтриете бисквитките както желаете. Можете да 
    изтриете всички бисквитки, които вече са на вашия компютър, и можете да 
    настроите повечето браузъри да предотвратяват поставянето им.
  </p>
  <p className="text-gray-700">
    <strong>Важно:</strong> Блокирането на всички бисквитки може да повлияе негативно 
    на функционалността на много уебсайтове.
  </p>
</section>

<section className="bg-white rounded-lg p-6 shadow-sm">
  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
    4. Управление на Бисквитките в Различни Браузъри
  </h2>
  <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li><strong>Google Chrome:</strong> Настройки → Поверителност и сигурност → Бисквитки</li>
    <li><strong>Mozilla Firefox:</strong> Опции → Поверителност и сигурност</li>
    <li><strong>Safari:</strong> Предпочитания → Поверителност</li>
    <li><strong>Microsoft Edge:</strong> Настройки → Бисквитки и разрешения</li>
  </ul>
</section>
```

---

## Quick Implementation Checklist

- [ ] Create three folders: `src/app/privacy/`, `src/app/terms/`, `src/app/cookies/`
- [ ] Create `page.tsx` in each folder
- [ ] Add necessary imports (Link, Droplets icon)
- [ ] Replace all placeholder text with your actual information
- [ ] Update footer links in main page
- [ ] Test all links work
- [ ] Have someone review the Bulgarian text
- [ ] Consider legal review before going live

---

## Important Notes

⚠️ **Legal Disclaimer**: These are generic templates and should be reviewed by a Bulgarian lawyer 
familiar with GDPR and local consumer protection laws before publication.

✅ **Customization**: Make sure to customize these templates to reflect your actual practices.

📅 **Updates**: Review and update these policies at least annually or whenever your practices change.

🌍 **Language**: All content is in Bulgarian to comply with local requirements.

---

## Additional Resources

- **GDPR Official Site**: https://gdpr.eu/
- **Bulgarian Data Protection Commission**: https://www.cpdp.bg/
- **Consumer Protection Bulgaria**: https://www.kzp.bg/

---

**Remember**: These legal pages are not just formalities - they build trust with your customers 
and are required by law. Take them seriously!

