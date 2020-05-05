# Slider - JQuery плагин, реализующий функционал "бегунка".

## Описание архитектуры
![](images/diagram.png)

Приложение построено по паттерну MVP.
###  Model
Этот слой представлен классом Model и работает с данными, коими в приложении являются значения, отбражаемые соответствующим положением ползунков на слайдере. Слайдер работает как с одним значением, так и с двумя. Значения могут представлять из себя числа из заданного диапазона или строки из указанного набора строк. Слой хранит значения и их обговляет. Не имеет зависимостей от других слоёв.

### View
Этот слой представлен классом View. Он отрисовывает интерфейс приложения на странице, управляет отображением данных и реагирует на действия пользователя. Не имеет зависимости от других слоёв приложения. В качестве параметров принимает элемент-контейнер для слайдера и объект с заданными для него опциями.

### Presenter
Этот слой представлени класссом Presenter. Он отвечает за взаимодествие модели и отображения. Имеет зависимости от слоёв Model
и View (получает при создании в качестве аргументов их экземпляры и связывается с определенными их методами посредством метода *bind*). Так же в качестве параметра принимает объект с заданными для слайдера опциями. Умеет обновлять эти параметры. Работает с внешними инпутами, которые отображают данные модели и могут быть использованы пользователем для ввода новых данных.

## Licence & copyright

© Pavel Lashuk
