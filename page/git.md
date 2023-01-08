# filter
```bash
git filter-branch -f --commit-filter '
    if [ "$GIT_AUTHOR_NAME" != "ojer" ];
    then
    GIT_AUTHOR_NAME="ojer"
    GIT_AUTHOR_EMAIL="sonamu@foxmail.com"
    GIT_COMMITTER_NAME="ojer"
    GIT_COMMITTER_EMAIL="sonamu@foxmail.com"
    git commit-tree "$@";
    else
    git commit-tree "$@";
    fi' HEAD

git filter-branch -f --env-filter '
    if [ "$GIT_COMMITTER_EMAIL" != "sonamu@foxmail.com" ]
    then
    export GIT_AUTHOR_NAME="ojer"
    export GIT_AUTHOR_EMAIL="sonamu@foxmail.com"
    export GIT_COMMITTER_NAME="ojer"
    export GIT_COMMITTER_EMAIL="sonamu@foxmail.com"
	ST1=${GIT_AUTHOR_DATE#@}
	ST2=${ST1%" +0800"}
	STR3=$((ST2-156031820))
    export GIT_AUTHOR_DATE=$STR3" +0800" 
    export GIT_COMMITTER_DATE=$STR3" +0800"
    fi' --tag-name-filter cat -- --branches --tags


###############################################
###############################################
2014-04-01 13:03:00
1396328580


git filter-branch -f --env-filter '
    if [ "$GIT_AUTHOR_DATE" != "1" ];
    then
	ST1=${GIT_COMMITTER_DATE#@}
	ST2=${ST1%" +0800"}
	STR3=$((ST2-156031820))
    export GIT_COMMITTER_DATE=$STR3" +0800"
    export GIT_AUTHOR_DATE=$STR3" +0800"
    fi' --tag-name-filter cat -- --branches --tags


###############################################
###############################################
15-2-25
1424854658
1396328580
+28526078


git filter-branch -f --env-filter '
    if [ "$GIT_AUTHOR_DATE" != "1" ];
    then
	ST1=${GIT_COMMITTER_DATE#@}
	ST2=${ST1%" +0800"}
	STR3=$((ST2-28526078))
    export GIT_AUTHOR_DATE=$STR3" +0800"
    export GIT_COMMITTER_DATE=$STR3" +0800"
    fi' --tag-name-filter cat -- --branches --tags

###############################################
###############################################

16-2-14
1455438312
1396328580
+59109732

git filter-branch -f --env-filter '
    if [ "$GIT_AUTHOR_DATE" != "1" ];
    then
	ST1=${GIT_COMMITTER_DATE#@}
	ST2=${ST1%" +0800"}
	STR3=$((ST2+59109732))
    export GIT_AUTHOR_DATE=$STR3" +0800"
    export GIT_COMMITTER_DATE=$STR3" +0800"
    fi' --tag-name-filter cat -- --branches --tags



###############################################
###############################################
17-2-3
1486113300
1396328580
+89784720

git filter-branch -f --env-filter '
    if [ "$GIT_AUTHOR_DATE" != "1" ];
    then
	ST1=${GIT_COMMITTER_DATE#@}
	ST2=${ST1%" +0800"}
	STR3=$((ST2+89784720))
    export GIT_AUTHOR_DATE=$STR3" +0800"
    export GIT_COMMITTER_DATE=$STR3" +0800"
    fi' --tag-name-filter cat -- --branches --tags

###############################################
###############################################
18-2-22
1519292122
1396328580
+122963542

git filter-branch -f --env-filter '
    if [ "$GIT_AUTHOR_DATE" != "1" ];
    then
	ST1=${GIT_COMMITTER_DATE#@}
	ST2=${ST1%" +0800"}
	STR3=$((ST2+122963542))
    export GIT_AUTHOR_DATE=$STR3" +0800"
    export GIT_COMMITTER_DATE=$STR3" +0800"
    fi' --tag-name-filter cat -- --branches --tags


 git show --pretty=fuller
https://github.com/ojer/friendly-invention-18
```
