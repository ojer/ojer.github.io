@echo off

echo javac
javac GenCatalogue.java

echo GenCatalogue
java GenCatalogue

echo git commit
git add .
git commit -m 'update'
git push origin master

IF %errorlevel% NEQ 0 GOTO ERROR
IF %errorlevel% EQU 0 GOTO OK

:OK
@cmd /c
GOTO END

: ERROR
@cmd /k
GOTO END

:END

