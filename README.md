<span id="pageStart"></span>
# Стартовый проект Gulp 4 для верстки

* [NPM](#npm)
* [Gulp](#gulp)
* [Структура папок](#directory)
* [Styleguide PUG](#styleguidePug)
* [Styleguide SCSS](#styleguidCss)
* [Полезные плагины JS](#pluginsjs)
* [Полезные плагины jQuery](#pluginsjquery)
* [Полезная информация](#useful)

## NPM <span id="npm"></span>
Команды NPM для работы с проектом
___
Для того что бы данная сборка работала, в системе __обязательно__ должна быть установлена актуальная версия [Node.js (LTS)](https://nodejs.org/en/) и NPM ( устанавливается вместе с Node.js ).
### Команды:
* __node -h__ - список всех команд Node.js
* __node -v__ - версия установленного Node.js
* __npm -h__ - список всех доступных команд пакетного менеджера (npm) 
* __npm help COMANDA__ - посмотреть инструкции для какой то из этих команд
* __npm -v__ - узнать версию NPM
* __npm install npm@latest -g или npm update npm -g__ - обновить NPM
* __npm init__ - инициализация пакетов NPM. *Инициализация пакетов - это процесс быстрой установки пакетов NPM-а, которые прописаны в файле package.json*
* __npm install__ - установить пакеты из файла package.json
* __npm list --depth=0__ - посмотреть список установленных пакетов
* __npm outdated --depth=0__ - посмотреть список установленных пакетов, которые требуют обновления
* __npm install PACKAGE или npm install PACKAGE --save-dev__ - позволяет установить любой пакет по его имени. Если при этом к команде добавить префикс -g пакет будет установлен глобально на весь компьюте
* __npm install PACKAGE -g__ - глобальная установка пакета
* __npm r PACKAGE__ - удалить пакет
* __npm rm PACKAGE -g__ - удалить глобально установленный пакет
* __npm up__ - обновить пакеты
#### Обновление пакетов NPM при изменении мажорной версии
*Если у пакета NPM сменилась версия на мажорную, то есть была изменена первая цифра в версии пакета (например установлена версия пакета 4.19.1, а последняя версия 5.3.0), то она не обновится командой npm up. Это сделано в целях безопасности.*

*Для обновления мажорной версии есть такая команда:*
__npm i -g npm-check-updates && ncu -a && npm i__

## Gulp <span id="gulp"></span>
Команды GULP для работы с проектом
___
Для работы сборки после установки Node.js необходимо установить глобально сам Gulp, командой __npm install gulp -g__
### Команды:
* __gulp__ - запускает сборку
* __gulp csslibs__ - формирование файла с плагинами libs.min.css. Пути к файлам прописываются в gulpfile.js в одноименном таске.
* __gulp jslibs__ - формирование файла с плагинами libs.min.js. Пути к файлам прописываются в gulpfile.js в одноименном таске.
* __gulp clearapp__ - удалить папку app
* __gulp clearprod__ - удалить папку prod
* __gulp build__ - формирование папки продакшена (prod)
* __gulp имя_таска__ - запустит конкретный таск. Например компиляция Pug в HTML
### Используемые плагины:
* __[gulp-pug](https://www.npmjs.com/package/gulp-pug)__ - компиляция HTML5 из PUG
* __[gulp-format-html](https://www.npmjs.com/package/gulp-format-html)__ - форматирование html в человеческий вид
* __[del](https://www.npmjs.com/package/del)__ - удаляет папка\файлы
* __[browser-sync](https://www.npmjs.com/package/browser-sync)__ - запускает виртуальный сервис
* __[gulp-sass](https://www.npmjs.com/package/gulp-sass)__ - компиляция SASS\SCSS в CSS
* __[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)__ - минификация CSS
* __[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)__ - формирование фйла-карты для стилей
* __[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)__ - генерация вендорных префиксов для CSS
* __[gulp-notify](https://www.npmjs.com/package/gulp-notify)__ - вывод уведомлений из тасков не в консоль а в центр уведомлений системы
* __[gulp-concat](https://www.npmjs.com/package/gulp-concat)__ - конкатенация файлов в тасках
* __[gulp-rename](https://www.npmjs.com/package/gulp-rename)__ - позволяет переименовывать пути или сами файлы в тасках
* __[gulp-uglify-es](https://www.npmjs.com/package/gulp-uglify-es)__ - минификация JS с поддежкой ES6
* __[webpack-stream](https://www.npmjs.com/package/webpack-stream)__ - обработка JavaScript
* __[gulp-webp](https://www.npmjs.com/package/gulp-webp)__ - формирует из jpg\png и т.д. картинки формата webp
* __[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)__ - минификация картинок
* __[gulp-cache](https://www.npmjs.com/package/gulp-cache)__ - кэширует файлы
* __[gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith)__ - генерирует спрайты png\jpg
* __[merge-stream](https://www.npmjs.com/package/merge-stream)__ - чередование потоков
#### Документации
* [GULP](https://gulpjs.com/)
* [NPM пакеты](https://www.npmjs.com/)
* [PUG](https://pugjs.org/api/getting-started.html)
* [SASS](https://sass-scss.ru/)
## Структура папок <span id="directory"></span>
Описание структуры папок проекта и правила расположения файлов
___
* app - Отражение папки prod. Стили и скрипты не минифицированны.
	* css
	* fonts
	* img
	* js
	* files
	* имя_документа.html
* node_modules
* prod
	* копия структуры app папки. Стили и скрипты минифицированны.
* src
	* assets
		* favicon
			* файлы генерировать с помощью сервиса https://realfavicongenerator.net/
		* files
			* разнообразные файлы (.doc .pdf и т.д.)
		* fonts
			* папка с названием шрифта
				* все файлы генерировать с помощью сервиса https://transfonter.org/ или аналогичного
		* libs
			* папка с названием плагина
				* название.js
				* название.css
	* layout
		* blocks
			* имя_блока
				* img
					* картинки данного блока
				* имя_блока.pug
				* имя_блока.scss
		* common
			* img
				* png
					* иконки для png спрайтов
				* svg
					* иконки для svg спрайта
			* common.js
			* common.scss
		* components
			* pug
				* buttons.pug
				* codes.pug
				* links.pug
				* meta.pug
				* mixin.pug
				* scripts.pug
				* vars.pug
			* scss
				* buttons.scss
				* colors.scss
				* general.scss
				* media.scss
				* mixin.scss
				* reset.scss
				* text-container.scss
				* vars.scss
		* pages
			* index.pug
* .gitignore
* gulpfile.js
* package-lock.json
* package.json
* README.md
## Styleguide разметки <span id="styleguidePug"></span>
Описание стиля написания разметки PUG
___
## Styleguide стилей <span id="styleguidCss"></span>
Описание стиля написания CSS
___
## Полезные плагины JS <span id="pluginsjs"></span>
Ссылки на плагины на нативном JS
___
* __[imask](https://imask.js.org/)__ - маски ввода
* __[Inputmask](https://github.com/RobinHerbots/Inputmask)__ - маски ввода
* __[swiper](https://swiperjs.com/get-started)__ - слайдер
* __[tingle](https://tingle.robinparisi.com/)__ - модальные окна
* __[nouislider](https://refreshless.com/nouislider/)__ - плагин ползунка выбора цены и т.д.
* __[spotlight](https://github.com/nextapps-de/spotlight)__ - галлерея изображений
* __[glightbox](https://biati-digital.github.io/glightbox/)__ - галлерея изображений
## Полезные плагины jQuery <span id="pluginsjquery"></span>
Ссылки на плагины на jQuery
___
* __[slick](https://kenwheeler.github.io/slick/)__ - слайдер
* __[fancybox](https://fancyapps.com/fancybox/3/)__ - галлерея изображений
* __[magnific-popup](https://dimsemenov.com/plugins/magnific-popup/)__ - модальные окна
* __[smartmenus](https://www.smartmenus.org/)__ - многоуровневое меню
* __[stellarnav](https://github.com/vinnymoreira/stellarnav)__ - многоуровневое меню
* __[aos](https://michalsnik.github.io/aos/)__ - плагин анимаций
* __[niceselect](https://jqueryniceselect.hernansartorio.com/)__ - кастомизация select
* __[twentytwenty](https://github.com/zurb/twentytwenty)__ - плагин сравнения 2х картинок
* __[ion.rangeSlider](http://ionden.com/a/plugins/ion.rangeSlider/)__ - плагин ползунка выбора цены и т.д.

## Полезная иформация <span id="useful"></span>
* при генерации 2x спрайта png все 2x картинки должны быть ровно на два увеличены что бы не было ошибок при работе таска
* для генерации правильного svg спрайта при выгрузке иконки из фигмы надо применить flatten для нее. Иконка должна быть из одного слоя.

[Вверх](#pageStart)
