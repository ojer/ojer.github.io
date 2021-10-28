1. mkdir `${catalina.home}/archiva/apps/`
2. cp `apache-archiva.war`  `${catalina.home}/archiva/apps/`

3. touch `${catalina.home}archiva/conf/archiva.xml`
```
<configuration>
    <version>2</version>
    <managedRepositories>
        <managedRepository>
            <location>${appserver.base}/repositories/internal</location>
            <daysOlder>30</daysOlder>
            <id>internal</id>
            <name>Archiva Managed Internal Repository</name>
        </managedRepository>
    </managedRepositories>
    <remoteRepositories>
        <remoteRepository>
            <url>http://repo1.maven.org/maven2</url>
            <id>central</id>
            <name>Central Repository</name>
        </remoteRepository>
    </remoteRepositories>
    <proxyConnectors>
        <proxyConnector>
            <sourceRepoId>internal</sourceRepoId>
            <targetRepoId>central</targetRepoId>
            <policies>
                <releases>always</releases>
                <checksum>fix</checksum>
                <snapshots>never</snapshots>
                <cache-failures>no</cache-failures>
            </policies>
        </proxyConnector>
    </proxyConnectors>
</configuration>

```
4. touch `${catalina.home}/conf/Catalina/localhost/archiva.xml`
```
<Context path="/archiva"
    docBase="${catalina.home}/archiva/apps/apache-archiva.war">
<Resource name="jdbc/users"
    auth="Container"
    type="javax.sql.DataSource"
    username="sa"
    password=""
    driverClassName="org.apache.derby.jdbc.EmbeddedDriver"
    url="jdbc:derby:/path/to/database/users;create=true" />
<Resource name="mail/Session"
    auth="Container"
    type="javax.mail.Session"
    mail.smtp.host="localhost"/>
</Context>

```
5. cp {`activation-1.1.1.jar` `derby-10.14.2.0.jar` `mail-1.4.7.jar`} `${catalina.home}/lib/` 
6. setting ${appserver.base}
```
Win:
`${catalina.home}/bin/catalina.bat`
set CATALINA_OPTS=-Dappserver.home=%CATALINA_HOME%\archiva -Dappserver.base=%CATALINA_HOME%\archiva

Linux:
`${catalina.home}/bin/catalina.sh`
//export JAVA_HOME=/bin/jdk1.8
//export JRE_HOME=${JAVA_HOME}/jre
appserver.base=/bin/apache-archiva/archiva
export CATALINA_OPTS="-Dappserver.home=$appserver.base -Dappserver.base=$appserver.base"

```
7. vi `${catalina.home}/conf/catalina.properties`

```
# tomcat.util.scan.StandardJarScanFilter.jarsToSkip
derbyLocale_*.jar
```
