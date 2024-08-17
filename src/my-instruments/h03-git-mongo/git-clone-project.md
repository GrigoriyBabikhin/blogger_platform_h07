# Клонировать проект в новый репозиторий на GitHub.
1. Создаем локальную папку и пустой git репозиторий называем ее также как удаленный репозиторий.
2. Открываем папку в IDE ➡️ терминал  
   ! Укажи путь к целевой папке, репозиторий будет клонирован напрямую в указанную папку.
```bash
git clone https://github.com/GrigoriyBabikhin/blogger_platform_h02.git C:\Backend\Git\01_course_backend-it-incubator\blogger_platform_h03
 ```
3. Создать новую ветку на GitHub.
```shell
git remote add new-origin https://github.com/GrigoriyBabikhin/blogger_platform_h03.git
```
4. Проверить что все ок.
```bash
git remote -v 
```
- Увидим примерно вот такое сообщение.
```
new-origin      https://github.com/GrigoriyBabikhin/blogger_platform_h03.git (fetch)
new-origin      https://github.com/GrigoriyBabikhin/blogger_platform_h03.git (push)
origin  https://github.com/GrigoriyBabikhin/blogger_platform_h02.git (fetch)
origin  https://github.com/GrigoriyBabikhin/blogger_platform_h02.git (push)
```
5. Запушим проект в нашу новую ветку.
```shell
git push new-origin main
```
6. Сделаем новую ветку основной.
```shell
git remote remove origin
git remote rename new-origin origin
```
- Проверим что все ок.
```shell
git remote -v
```
- Увидим примерно вот такое сообщение.
```
origin  https://github.com/GrigoriyBabikhin/blogger_platform_h03.git (fetch)
origin  https://github.com/GrigoriyBabikhin/blogger_platform_h03.git (push)
```
7. Все готово осталось установить зависимости из папки yarn.lock.
```shell
yarn install
```