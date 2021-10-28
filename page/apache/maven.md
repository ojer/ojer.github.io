- pom.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.3.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    </properties>

    <dependencies>
		<!--本地jar-->
		<dependency>
			<groupId>org.dcm4che</groupId>
			<artifactId>dcm4che-core</artifactId>
			<version>5.10.5</version>
			<scope>system</scope>
			<systemPath>${project.basedir}/src/lib/dcm4che-core-5.10.5.jar</systemPath>
		</dependency>
	</dependencies>
	<repositories>
		<repository>
			<id>alimaven</id>
			<name>aliyun maven</name>
			<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
		</repository>
	</repositories>
	<build>
		<finalName>imageadd</finalName>
		<plugins>
			<!--编译阶段指定外部lib-->
			<!--配置多个数据，mac,linux用冒号(:)，而windows用分号(;)-->
			<!--windows路径用\，mac，linux用/-->
			<plugin>
				<artifactId>maven-compiler-plugin</artifactId>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
					<encoding>UTF-8</encoding>
					<compilerArguments>
                                                 <verbose/>
                                                 <bootclasspath>${java.home}\lib\rt.jar;${java.home}\lib\jce.jar</bootclasspath>
						<extdirs>src\lib;${env.JAVA_HOME}\jre\lib\ext</extdirs>
					</compilerArguments>
				</configuration>
			</plugin>
<!--类文件、依赖的jar文件和资源文件等打包以构建war包文件-->
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-war-plugin</artifactId> 
				<configuration>
					<webResources>
						<resource>
							<directory>src/lib</directory>
							<targetPath>WEB-INF/lib/</targetPath>
							<includes>
								<include>**/*.jar</include>
							</includes>
						</resource>
					</webResources>
					<skip>true</skip>
				</configuration>
			</plugin>

			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
				<executions>
					<execution>
						<goals>
							<goal>repackage</goal>
						</goals>
					</execution>
				</executions>
				<configuration>
					<fork>true</fork>
					<includeSystemScope>true</includeSystemScope>
				</configuration>
			</plugin>

			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-surefire-plugin</artifactId>
				<configuration>
					<skip>true</skip>
				</configuration>
			</plugin>
		</plugins>
	</build>
</project>

```
