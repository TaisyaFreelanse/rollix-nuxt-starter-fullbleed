<template>
  <main class="w-full min-h-screen pb-20">
    <div class="px-3 sm:px-4 lg:px-8 py-2 sm:py-3 max-w-4xl mx-auto">
      <h1 class="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Публичная оферта</h1>
      
      <div class="space-y-3 sm:space-y-4 text-gray-300 text-[10px] sm:text-xs">
        <div>
          <p class="leading-relaxed">
            Настоящая публичная оферта является официальным предложением интернет-магазина Rollix 
            заключить договор купли-продажи товара на условиях, изложенных ниже.
          </p>
        </div>

        <div>
          <h2 class="text-xs sm:text-sm font-semibold text-white mb-2">1. Общие положения</h2>
          <p class="leading-relaxed">
            Настоящая публичная оферта (далее — «Оферта») является публичным предложением интернет-магазина 
            Rollix, адресованный неограниченному кругу лиц, заключить договор купли-продажи товара 
            дистанционным способом на условиях, определенных в настоящей Оферте.
          </p>
        </div>

        <div>
          <h2 class="text-xs sm:text-sm font-semibold text-white mb-2">2. Термины и определения</h2>
          <ul class="list-disc list-inside space-y-1.5 ml-3">
            <li><strong>Продавец</strong> — интернет-магазин Rollix</li>
            <li><strong>Покупатель</strong> — любое физическое лицо, принявшее условия настоящей Оферты</li>
            <li><strong>Товар</strong> — продукция, представленная на Сайте Продавца</li>
            <li><strong>Заказ</strong> — оформленный Покупателем запрос на приобретение Товара</li>
          </ul>
        </div>

        <div>
          <h2 class="text-xs sm:text-sm font-semibold text-white mb-2">3. Предмет договора</h2>
          <p class="leading-relaxed">
            Продавец обязуется передать в собственность Покупателю товар, а Покупатель обязуется 
            принять и оплатить товар на условиях настоящей Оферты.
          </p>
        </div>

        <div>
          <h2 class="text-xs sm:text-sm font-semibold text-white mb-2">4. Цена товара и условия оплаты</h2>
          <p class="leading-relaxed">
            Цена товара указана на Сайте Продавца. Продавец вправе изменять цену товара в любое время. 
            Оплата товара осуществляется наличными денежными средствами курьеру при получении товара 
            либо посредством оплаты банковской картой через систему онлайн-платежей.
          </p>
        </div>

        <div>
          <h2 class="text-xs sm:text-sm font-semibold text-white mb-2">5. Порядок оформления заказа</h2>
          <p class="leading-relaxed">
            Покупатель оформляет заказ через форму на Сайте Продавца. После оформления заказа 
            Покупатель получает подтверждение заказа на указанный номер телефона или адрес электронной почты.
          </p>
        </div>

        <div>
          <h2 class="text-xs sm:text-sm font-semibold text-white mb-2">6. Доставка товара</h2>
          <p class="leading-relaxed">
            Доставка товара осуществляется курьерской службой Продавца в пределах зон доставки, 
            указанных на Сайте. Стоимость и условия доставки указаны на Сайте.
          </p>
        </div>

        <div>
          <h2 class="text-xs sm:text-sm font-semibold text-white mb-2">7. Права и обязанности сторон</h2>
          <p class="leading-relaxed mb-2">
            <strong>Покупатель имеет право:</strong>
          </p>
          <ul class="list-disc list-inside space-y-1.5 ml-3 mb-2">
            <li>Получить полную и достоверную информацию о товаре</li>
            <li>Отказаться от товара до его получения</li>
          </ul>
          <p class="leading-relaxed mb-2">
            <strong>Продавец имеет право:</strong>
          </p>
          <ul class="list-disc list-inside space-y-1.5 ml-3">
            <li>Изменять условия настоящей Оферты</li>
            <li>Отказать в выполнении заказа при отсутствии товара</li>
          </ul>
        </div>

        <div>
          <h2 class="text-xs sm:text-sm font-semibold text-white mb-2">8. Заключительные положения</h2>
          <p class="leading-relaxed">
            Настоящая Оферта вступает в силу с момента её размещения на Сайте и действует до момента 
            её отзыва Продавцом. Принятие условий настоящей Оферты происходит путём оформления заказа 
            на Сайте Продавца.
          </p>
        </div>

        <div class="pt-2 border-t border-white/10">
          <p class="text-gray-400 text-[10px] sm:text-xs">
            Дата последнего обновления: {{ new Date().toLocaleDateString('ru-RU') }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

