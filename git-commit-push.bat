@echo off

echo --start
echo --javac
javac GenCatalogue.java

echo --GenCatalogue
java GenCatalogue

echo --git commit
git add .
git commit -m 'update'
git push origin master

echo --end
pause >null