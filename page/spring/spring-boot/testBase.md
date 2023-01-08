```
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

	@RunWith(SpringRunner.class)
	@SpringBootTest(classes = ImageAddApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
	public class getAllJobTest {
		@LocalServerPort
		private int port;

		private URL base;

		@Autowired
		private JobModuleMapper jobModuleMapper;
		@Autowired
		private JobMapper jobMapper;

		@Before
		public void setUp() throws Exception {
			String url = String.format("http://localhost:%d/", port);
			System.out.println(String.format("port is : [%d]", port));
			this.base = new URL(url);
		}

		@Test
		public void t1() {
			List<Integer> moduleList = ModuleEnum.getUnionModule();
			moduleList.addAll(ModuleEnum.getSystemManageModule());
			List<Job> jobs = jobMapper.selectAll().stream().filter(job -> {
				boolean b = true;
				if (job.getJobId() < 3) {
					return false;
				}
				for (JobModule jobModule : jobModuleMapper.selectByJobId(job.getJobId())) {
					if (moduleList.contains(jobModule.getModuleId())) {
						b = false;
						break;
					}
				}
				return b;
			}).collect(Collectors.toList());
			jobs.forEach(j -> {
				System.out.println(j.getJobName());
			});
		}
	}

```
