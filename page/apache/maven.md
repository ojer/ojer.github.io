# maven
- pom.xml

```
<?xml version="1.0" encoding="UTF-8"?>
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
                        <verbose> <verbose/>
                        <bootclasspath>${java.home}\lib\rt.jar;${java.home}\lib\jce.jar</bootclasspath>
						<extdirs>src\lib;${env.JAVA_HOME}\jre\lib\ext</extdirs>
					</compilerArguments>
				</configuration>
			</plugin>
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
		</plugins>
	</build>
</project>
```

`-DskipTests=true package`
