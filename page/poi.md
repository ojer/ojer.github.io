# Cell.getStringCellValue

```java
package ming.test;

import com.alibaba.fastjson.JSONObject;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.junit.Test;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

import static org.apache.poi.ss.usermodel.CellType.BLANK;
import static org.apache.poi.ss.usermodel.CellType._NONE;

public class FindFileTest {


    @Test
    public void t1() {
        excelParse("C://temp/uses.xls");
    }


    public void excelParse(String filename) {
        File file = new File(filename);
        FileInputStream inStream = null;
        Workbook workBook = null;
        try {
            inStream = new FileInputStream(file);
            workBook = WorkbookFactory.create(inStream);
        } catch (IOException | InvalidFormatException fileNotFoundException) {
            fileNotFoundException.printStackTrace();
        }
        if (workBook == null) {
            return;
        }
        for (Sheet rows : workBook) {
            if (rows == null) {
                continue;
            }
            Row row = rows.getRow(0);
            if (checkRowNull(row)) {
                continue;
            }
            int lastCellNum = row.getLastCellNum();
            for (Row cells : rows) {
                if (cells == null) {
                    continue;
                }
                Cell cellTe = cells.getCell(0);
                if (cellTe != null) {
                    String string = getCellVal(cellTe);
                    if (!StringUtils.isEmpty(string) && string.trim().startsWith("#")) {
                        continue;
                    }
                }
                getUser(lastCellNum, cells);
            }
        }
        try {
            inStream.close();
        } catch (IOException ioException) {
            ioException.printStackTrace();
        }
        try {
            workBook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void getUser(int lastCellNum, Row cells) {
        String user_password = "user_password";
        String user_name = "user_name";
        String reg_time = "reg_time";
        String sex = "sex";
        String birthday = "birthday";
        String job = "job";
        String education = "education";
        String hospital = "hospital";
        String site = "site";
        String phone = "phone";
        String card = "card";
        String invoice = "invoice";
        String invoiceno = "invoiceno";
        String basic = "basic";
        String credit = "credit";
        JSONObject user = new JSONObject();
        for (int j = 0; j <= lastCellNum; j++) {
            user.put(user_password, "dfaf4c943fda76e99796839e38779403");
            user.put(reg_time, "2021-07-01 08:00:00");
            Cell cell = cells.getCell(j);
            if (cell == null) {
                continue;
            }
            String string = getCellVal(cell);
            if (StringUtils.isEmpty(string)) {
                continue;
            }
            String key = "";
            switch (j) {
                case 1:
                    key = user_name;
                    break;
                case 2:
                    key = birthday;
                    break;
                case 3:
                    key = sex;
                    break;
                case 4:
                    key = card;
                    break;
                case 5:
                    key = education;
                    break;
                case 6:
                    key = job;
                    break;
                case 7:
                    key = hospital;
                    break;
                case 8:
                    key = basic;
                    break;

                case 9:
                    key = site;
                    break;

                case 10:
                    key = phone;

                    break;
                case 11:
                    key = invoice;
                    break;

                case 12:
                    key = invoiceno;

                    break;
                case 13:
                    key = credit;
                    break;
                default:
                    break;
            }
            user.put(key, string);
        }
        System.err.print("(");
        System.err.print("\"" + user.getString(user_password) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(user_name) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(sex) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(birthday) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(job) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(education) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(hospital) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(site) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(phone) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(reg_time) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(card) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(invoice) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(invoiceno) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(basic) + "\"");
        System.err.print(",");
        System.err.print("\"" + user.getString(credit) + "\"");
        System.err.print(")");
        System.err.println(",");
    }


    /**
     * 判断行为空
     */
    private boolean checkRowNull(Row row) {
        if (row == null) {
            return true;
        }
        for (Cell c : row) {
            CellType cellType = c.getCellTypeEnum();
            if (cellType != BLANK && cellType != _NONE) {
                return false;
            }
        }
        return true;
    }

    /**
     * 判断类型获取值
     */
    private String getCellVal(Cell cell) {
        if (cell == null) {
            return null;
        }
        String val;

        DecimalFormat df = new DecimalFormat("0");
        switch (cell.getCellTypeEnum()) {
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    val = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(cell.getDateCellValue());
                } else {
                    val = df.format(cell.getNumericCellValue());
                }
                break;
            case STRING:
            case BLANK:
                val = cell.getStringCellValue();
                break;
            case BOOLEAN:
                val = String.valueOf(cell.getBooleanCellValue());
                break;
            case ERROR:
                val = "错误";
                break;
            case FORMULA:
                try {
                    val = String.valueOf(cell.getStringCellValue());
                } catch (IllegalStateException e) {
                    val = String.valueOf(cell.getNumericCellValue());
                }
                break;
            default:
                val = cell.getRichStringCellValue() == null ? null : cell.getRichStringCellValue().toString();
        }
        return val;
    }

}
```
# hssfWorkbook.write

```java
package com.imageadd.cloud.file.handling.util;
// poi 4.1.2
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.junit.Test;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDate;

public class ExcelTest {
    String filePath = "C:\\temp\\666.xlsx";

    @Test
    public void t1() throws Exception {
        int g = 1;
        File file = new File(filePath);
        FileInputStream inStream = new FileInputStream(file);
        Workbook workBook = WorkbookFactory.create(inStream);
        HSSFWorkbook hssfWorkbook = new HSSFWorkbook();
        for (int i = 0; i < workBook.getNumberOfSheets(); i++) {
            Sheet rows = workBook.getSheetAt(i);
            if (rows == null) {
                continue;
            }
            HSSFSheet hssfSheet = hssfWorkbook.createSheet();
            for (int j = 0; j <= rows.getLastRowNum(); j++) {
                Row cells = rows.getRow(j);
                if (cells == null) {
                    continue;
                }
                HSSFRow hssfRow = hssfSheet.createRow(j);
                short lastCellNum = cells.getLastCellNum();
                if (lastCellNum < 10) {
                    continue;
                }
                for (int k = 1; k < lastCellNum; k++) {
                    Cell cell = cells.getCell(k);
//                    int rowIndex = cell.getRowIndex();
                    int columnIndex = cell.getColumnIndex();
                    String cellVal = ExcelUtils.getCellVal(cell);
                    if (StringUtils.isEmpty(cellVal)) {
                        cellVal = "";
                    }
                    HSSFCell hssfCell = hssfRow.createCell(k - 1, CellType.STRING);
                    switch (columnIndex) {
                        case 1:
                            try {
                                LocalDate parse = LocalDate.parse(cellVal);
                                hssfCell.setCellValue(parse);
                            } catch (Exception e) {
                                hssfCell.setCellValue(cellVal);
                            }
                            break;
                        case 4:
                            if (cellVal.contains("出")) {
                                g = 1;
                            } else if (cellVal.contains("入")) {
                                g = -1;
                            }
                            hssfCell.setCellValue(cellVal);
                            break;
                        case 12:
                            try {
                                double aDouble = Double.parseDouble(cellVal);
                                double v = aDouble * g;
                                hssfCell.setCellValue(v);
                            } catch (Exception e) {
                                hssfCell.setCellValue(cellVal);
                            }
                            break;
                        default:
                            hssfCell.setCellValue(cellVal);
                            break;
                    }
                }
                inStream.close();
            }
        }
        hssfWorkbook.write(new File("C:\\temp\\text.xlsx"));
    }
}


```
