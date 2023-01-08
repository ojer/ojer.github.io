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


- dependency

```
mvn dependency:list -Dverbose    列出不同版本 jar
mvn dependency:tree -Dverbose    列出项目的包依赖树
    -Dincludes 出指定要求的jar，其他的忽略
        参数值：[groupId]:[artifactId]:[type]:[version]
        示例 -Dincludes=velocity:velocity，只列出velocity的依赖关系
            -Dincludes=:spring-aop，
            -Dincludes=:::5.0.6.RELEASE，
            -Dincludes=org.springframework
        通配符：org.apache.*, :::*-SNAPSHOT
        多参：-Dincludes=org.apache.maven*,org.codehaus.plexus
    -Dexcludes    排除指定的jar

dependency:analyze-only    依赖分析
dependency:analyze-duplicate    查找重复声明的依赖
mvn dependency:list-repositories    列出远程repositories
dependency:purge-local-repository    清理本地repository
    解析整个项目的依赖，然后从本地清理，重新从远程 repository 下载这个命令默认的对所有的依赖项进行操作。它会在清除操作之前，下载某些缺失的依赖来收集完整的依赖树信息。
为了避免这些预下载的操作，你可以设置参数，
    -DactTransitively=false   仅对项目的直接依赖进行操作。
    -Dincludes 指定依赖
     dependency:purge-local-repository -Dincludes=org.slf4j:slf4j-api,org.slf4j:log4j-over-slf4j。
    -Dexcludes 排除依赖。

    -DmanualInclude    清理不在本项目中的依赖，但是不会重新解析依赖，因为本项目不需要这些依赖。 对清理parent pom，导入的pom，maven插件非常有用
```
