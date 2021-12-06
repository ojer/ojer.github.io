
```
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class D {

    static String in = "/home/shihe/bxb";
    static String out = "/home/shihe/bxb/out/";

    /**
     *ffmpeg.exe -f concat -safe 0 -i file.txt -c copy out.mp4
     */
    public static void main(String[] args) throws Exception {
        String name = args[0];
        out += name;
        File file = new File(in, name);
        FileReader reader = new FileReader(file);
        BufferedReader bufferedReader = new BufferedReader(reader);
        while (bufferedReader.ready()) {
            String s = bufferedReader.readLine();
            if (!s.startsWith("http")) {
                continue;
            }
            d(s);
        }
        c(bufferedReader);
    }

    private static void d(String spec) throws MalformedURLException {
        String filename = spec.substring(spec.lastIndexOf("/") + 1);
        String fileDir = filename.substring(0,filename.indexOf("."));
        URL url = new URL(spec);
        try {
            URLConnection conn = url.openConnection();
            InputStream inStream = conn.getInputStream();
            File file = new File(out);
            if (!file.exists() && !file.isDirectory()) {
                boolean mkDirs = file.mkdirs();
            }
            FileOutputStream fs = new FileOutputStream(out + File.separator + filename);
            byte[] buffer = new byte[1204];
            int read;
            while ((read = inStream.read(buffer)) != -1) {
                fs.write(buffer, 0, read);
                fs.flush();
            }
            c(fs);
            c(inStream);
            System.out.println(fileDir);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void c(Closeable closeable) {
        if (closeable != null) {
            try {
                closeable.close();
            } catch (Exception ignored) {
            }
        }
    }
}

```

```
import java.io.File;
import java.util.Arrays;
import java.util.List;

public class K {

    /**
     *
     * #16进制数转ascii码，最后的0a不要
     * keystr=
     * hexdump -v -e '16/1 "%02x"' key.key
     * 
     * iv=
     * printf '%032x' $index
     * 
     * openssl aes-128-cbc -d -in in.ts -out out.ts -nosalt -iv $iv -K $keystr
     */
    public static void main(String[] args) throws Exception {
        List<String> keyList = Arrays.asList(
                "30313030383230626162383865386663",
                "37323161393531363863653839656564",
                "62653533346435646362646365636638",
                "39336161366531653964623963616663",
                "32343136633832336263386565663965",
                "61623536343865616365386165636539",
                "64346338623762306466613862646262",
                "36623533313735373861396139396463",
                "62663765393132346239656662653962"
                );

        List<String> nameList = Arrays.asList("02", "03", "04", "05", "06", "07", "08", "09", "10");

        String iv = "00000000000000000000000000000000";
        for (int i = 0; i < nameList.size(); i++) {
            String path = "/mnt/c/Users/Ming/Desktop/bxb/out/" + nameList.get(i) + ".m3u8";
            String key = keyList.get(i);
            File file = new File(path);
            File[] files = file.listFiles();
            for (File file1 : files) {
                String name = file1.getName();
                String in = path + File.separator + name;
                String out = path + File.separator + "out-" + name;
                String c = "openssl aes-128-cbc -d -in "
                    + in
                    + " -out "
                    + out
                    + " -nosalt -iv "
                    + iv
                    + " -K "
                    + key;
                Runtime runtime = Runtime.getRuntime();
                runtime.exec(c);
                System.out.println(name);
            }
        }
    }
}


```

