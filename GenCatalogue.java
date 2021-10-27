import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class GenCatalogue {
    public static void main(String[] args) throws IOException {
        String pageFolder = "page";
        String cataloguePrefix = "1. [";
        String catalogueSplicing = "](./" + pageFolder + "/";
        String catalogueSuffix = ".html)";

        File pages = new File(pageFolder);
        File index = new File("catalogue.md");

        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(index));
        bufferedWriter.write("> catalogue");
        bufferedWriter.flush();

        File[] files = pages.listFiles();
        assert files != null;
        for (File mdFile : files) {
            bufferedWriter.newLine();
            String name = mdFile.getName();
            name = name.substring(0,name.lastIndexOf("."));
            bufferedWriter.write(cataloguePrefix + name + catalogueSplicing + name + catalogueSuffix);
            bufferedWriter.flush();
        }
        bufferedWriter.close();
    }
}
