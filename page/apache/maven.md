# maven
- 指定 jar 版本
```
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.37</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

- package jar 引入依赖
```
<plugin>
    <artifactId>maven-assembly-plugin</artifactId>
    <configuration>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
    </descriptorRefs>
    <archive>
        <manifest>
            <mainClass>com.sh.file.Main</mainClass>
        </manifest>
    </archive>
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>

```

- 指定外部 lib
```
<plugin>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <source>1.8</source>
        <target>1.8</target>
        <encoding>UTF-8</encoding>
        <compilerArguments>
           <verbose></verbose>
           <bootclasspath>${java.home}\lib\rt.jar;${java.home}\lib\jce.jar</bootclasspath>
           <extdirs>src\lib;${env.JAVA_HOME}\jre\lib\ext</extdirs>
        </compilerArguments>
    </configuration>
</plugin>
```
- package war 引入依赖
```
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
```

`-DskipTests=true package`
