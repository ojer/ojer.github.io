import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class GenCatalogue {

    private static final String PAGE_FOLDER = "page";
    private static final String INCLUDES = "_includes/catalogue.html";
    private static final String UL_STA = "<ul>";
    private static final String UL_END = "</ul>";
    private static final String LI_STA = "<li>";
    private static final String LI_END = "</li>";
    private static final String CATALOGUE_PREFIX = LI_STA + "<a href=\"{{ '/";
    private static final String CATALOGUE_SPLICING = ".html' }}\">";
    private static final String CATALOGUE_SUFFIX = "</a>" + LI_END;

    public static void main(String[] args) throws IOException {
        File pages = new File(PAGE_FOLDER);
        File index = new File(INCLUDES);
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(index));
        File[] files = pages.listFiles();
        assert files != null;
        write(files, PAGE_FOLDER, bufferedWriter);
        bufferedWriter.close();
    }


    static void write(File[] files, String dir, BufferedWriter bufferedWriter) throws IOException {
        for (File mdFile : files) {
            if (mdFile.isFile()) {
                bufferedWriter.newLine();
                String name = mdFile.getName();
                name = name.substring(0, name.lastIndexOf("."));
                bufferedWriter.write(CATALOGUE_PREFIX + dir + "/" + name + CATALOGUE_SPLICING + name + CATALOGUE_SUFFIX);
                bufferedWriter.flush();
            } else if (mdFile.isDirectory()) {
                File[] listFiles = mdFile.listFiles();
                if (listFiles != null) {
                    String name = mdFile.getName();
                    bufferedWriter.newLine();
                    bufferedWriter.write(LI_STA);
                    bufferedWriter.write(name);
                    bufferedWriter.newLine();
                    bufferedWriter.write(UL_STA);
                    bufferedWriter.flush();
                    write(listFiles, dir + "/" + name, bufferedWriter);
                    bufferedWriter.newLine();
                    bufferedWriter.write(UL_END);
                    bufferedWriter.newLine();
                    bufferedWriter.write(LI_END);
                    bufferedWriter.flush();
                }
            }
        }
    }
}
