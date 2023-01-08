# file
## tar
```bash
tar xvf FileName.tar -C DirName

tar cvf FileName.tar DirName
```
## gz
```bash
gunzip FileName.gz
gzip -d FileName.gz

gzip FileName
```

## tar.gz
```bash
tar zxvf FileName.tar.gz

tar zcvf FileName.tar.gz DirName

```
## bz2
```bash
bzip2 -d FileName.bz2
bunzip2 FileName.bz2

bzip2 -z FileName

```
## tar.bz2
```bash
tar jxvf FileName.tar.bz2

tar jcvf FileName.tar.bz2 DirName

```
## bz
```bash
bzip2 -d FileName.bz
bunzip2 FileName.bz

```
## tar.bz
```bash
tar jxvf FileName.tar.bz

```
## Z
```bash
uncompress FileName.Z

compress FileName

```
## tar.Z
```bash
tar Zxvf FileName.tar.Z

tar Zcvf FileName.tar.Z DirName

```
## tgz
```bash
tar zxvf FileName.tgz
```

## tar.tgz
```bash
tar zxvf FileName.tar.tgz

tar zcvf FileName.tar.tgz FileName

```
## zip
```bash
unzip FileName.zip -d DirName

zip FileName.zip DirName
```

## lha
```bash
lha -e FileName.lha

lha -a FileName.lha FileName
```

## rar
```bash
rar a FileName.rar

rar e FileName.rar      
```


# ssh
```
  sudo apt-get install openssh-server
# status “ssh-agent”和“sshd”，否则表示没有安装服务，或没有开机启动
    ps -e|grep ssh
    
# 开机自动启动ssh命令
sudo systemctl enable ssh

# 关闭ssh开机自动启动命令
sudo systemctl disable ssh

# 单次开启ssh
sudo systemctl start ssh

# 单次关闭ssh
sudo systemctl stop ssh

# 设置好后重启系统
reboot

#查看ssh是否启动，看到Active: active (running)即表示成功
sudo systemctl status ssh

#  检查ssh的服务状态
sudo service ssh statu
#  开启ssh服务   
sudo service ssh restart
# -------------------
# 关闭防火墙
sudo ufw disable 
#查看下防火墙状态
sudo ufw status 
# 状态为inactive 则为已关闭
# 开启22 端口
sudo ufw allow 22
```

#wsl
## LocalState
```
C:\Users\user\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu...\LocalState\rootfs
```

## nohup-tomcat
```bash
wsl.exe -e sudo nohup /home/meteis/apache-tomcat-8.5.65/bin/startup.sh &
```
## profile
```bash
	sudo vi /etc/profile

	#set java environment
	export JAVA_HOME=/java/jdk-8u201-linux-x64
	export JRE_HOME=${JAVA_HOME}/jre
	export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH
	export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
   source /etc/profile
```

## ps
```bash
ps -eaf | grep tomcat

# show
root     12038     1  0 13:41 ?  

kill -p 12038 

```

## sources

```
#sources.list 
# /etc/apt 
```

