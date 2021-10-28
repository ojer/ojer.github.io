```
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration("src/test/resources")
@ContextConfiguration(locations = {"classpath:spring-mvc-test.xml", "classpath:spring-mybatis-test.xml","classpath:spring-shiro-test.xml"})
public class BaseTest {
}
```
