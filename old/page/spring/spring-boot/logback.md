```xml
	logging:
	config: classpath:logback.xml
	level:
	org.springframework.web: TRACE


<?xml version="1.0" encoding="UTF-8"?>
<configuration>
	<property name="LOG_HOME" value="C://shihe/imageadd/log"> </property>
	<!--    <logger name="com.image.add.dao" level="DEBUG"/>-->
	<conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter"/>
	<conversionRule conversionWord="wex"
		converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter"/>
	<conversionRule conversionWord="wEx"
		converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter"/>
	<property name="CONSOLE_LOG_PATTERN"
		value="${CONSOLE_LOG_PATTERN:-%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(${LOG_LEVEL_PATTERN:-%5p}) %clr(${PID:- }){magenta} %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}"/>

	<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
		<encoder>
			<pattern>${CONSOLE_LOG_PATTERN}</pattern>
			<charset>utf8</charset>
		</encoder>
	</appender>

	<appender name="DAYINFO" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<!--日志文件输出的文件名-->
			<FileNamePattern>${LOG_HOME}/log.%d{yyyy-MM-dd}.log</FileNamePattern>
				<!--日志文件保留天数-->
			<MaxHistory>30</MaxHistory>
		</rollingPolicy>
		<filter class="ch.qos.logback.classic.filter.LevelFilter">
			<level>info</level>
			<onMatch>ACCEPT</onMatch>
			<onMismatch>DENY</onMismatch>
		</filter>
		<encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
			<!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
			<pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
		</encoder>
		<!--日志文件最大的大小-->
		<triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
			<MaxFileSize>10MB</MaxFileSize>
		</triggeringPolicy>
	</appender>

	<appender name="DAYERROR" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<FileNamePattern>${LOG_HOME}/log.%d{yyyy-MM-dd}.log</FileNamePattern>
			<MaxHistory>30</MaxHistory>
		</rollingPolicy>
		<filter class="ch.qos.logback.classic.filter.LevelFilter">
			<level>ERROR</level>
			<onMatch>ACCEPT</onMatch>
			<onMismatch>DENY</onMismatch>
		</filter>
		<encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
			<!--格式化输出：%d 日期，%thread ，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
			<pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
		</encoder>
		<triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
			<MaxFileSize>30MB</MaxFileSize>
		</triggeringPolicy>
	</appender>

	<!-- 数据库 -->
	<appender name="DB-CLASSIC-MYSQL-POOL" class="ch.qos.logback.classic.db.DBAppender">
		<connectionSource class="ch.qos.logback.core.db.DataSourceConnectionSource">
			<dataSource class="org.apache.commons.dbcp.BasicDataSource">
				<driverClassName>com.mysql.jdbc.Driver</driverClassName>
				<url>jdbc:mysql://localhost:3306/db_shris_log?characterEncoding=UTF-8&amp;useSSL=false</url>
				<username>root</username>
				<password>shihe</password>
			</dataSource>
		</connectionSource>
		<filter class="com.sh.ris.common.filter.SampleFilter">
			<level>INFO</level>
			<onMatch>ACCEPT</onMatch>
			<onMismatch>DENY</onMismatch>
		</filter>
	</appender>

	<root level="INFO">
		<appender-ref ref="STDOUT"/>
		<appender-ref ref="DAYERROR"/>
		<appender-ref ref="DAYINFO"/>
		<appender-ref ref="DB-CLASSIC-MYSQL-POOL"/>
	</root>
</configuration>

```
