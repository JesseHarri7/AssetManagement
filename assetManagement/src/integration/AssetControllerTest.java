
import static org.junit.Assert.assertNotNull;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import com.assetManagement.entities.Asset;

@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT) //(classes = App.class)
//@WebAppConfiguration
public class AssetControllerTest 
{
	
	RestTemplate restTemplate = new RestTemplate();
	private Asset createAsset;
			
//	@Value("local.server.port")
    protected String port = "8080";
	
	String BASE_URL = "http://localhost:"+port+"/assetManagement/asset";
	
	@Before
	public void testCreateAsset() throws Exception
	{
		 BASE_URL = "http://localhost:"+port+"/assetManagement/asset";

		String url = BASE_URL + "/create";
		Asset asset = new Asset(8L, "HP Pav", "Test", "HP", "01/10/2018", "Good");
		createAsset = restTemplate.postForObject(url, asset, Asset.class);
		assertNotNull(createAsset);
		
	}
	
	@Test
	public void testFindById()
	{
		String url = BASE_URL + "/{id}";
		Asset asset = restTemplate.getForObject(url, Asset.class, "1");
		assertNotNull(asset);
		
	}
	
}