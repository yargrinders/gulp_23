<p align="center"><a href="https://gulpjs.com/" target="_blank"><img src="https://raw.githubusercontent.com/dperrymorrow/gulp-task-generator/master/gulp_generator_logo.png" alt="Gulp Logo"></a></p>

## Установка 

- git clone https://github.com/yargrinders/gulp_23.git
- cd gulp_23 
- npm i

## Установка c бубном 

- git clone https://github.com/yargrinders/Clear_gulp.git
- cd cd gulp_23 
- Плагин - SASS - устанавливаем таким образом: 
- Для установки пакета используйте команду: « npm install sass gulp-sass --save-dev »
- Плагин imagemin - устанавливаем « npm i gulp-imagemin@7.1.0 --save-dev »
- Плагин del - устанавливаем npm i del@6.1.1 --save-dev
- npm i


## Команды Gulp 

- cd cd gulp_23
- Gulp - dev разработка
- gulp build - деплой в dist

## Добавить jQuery 3.6.1

- gulpfile.js - 69я строчка расскоментировать // 'node_modules/jquery/dist/jquery.js',

## Добавить Materialize

- Materialize - npm install materialize-css@next
- gulpfile.js - 69-70я строчка add 'node_modules/materialize-css/dist/js/materialize.min.js',

## В планах добавить 

- bem - Бем блоки 

## Settings 

- // Sass .pipe(scss({ outputStyle: 'compressed'})) - Compressed
- // Sass .pipe(scss()) - NotCompressed
- Scss - .pipe(scss({outputStyle: 'expanded'})) - css - Не сжато
- Scss - .pipe(scss({outputStyle: 'compressed'})) - css - Сжато