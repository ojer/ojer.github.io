# select-get-selected-text

```
$(data.elem).find("option:selected").text();
```

# table-edit
```javascript
table.on('edit(genreTable)', function(obj) {
		var ele = $(this).prev();
		var oldVal = ele.text();
		var genre = obj.data;
		var field = obj.field;
		$.ajax({
			type : 'post',
			data : genre,
			url : ContextPath + "/sys/material/updateGenre",
			success: function(data){
				if(data == 0){
					layer.msg('修改失败');
				}
				if(data == 2){
					$(ele[0]).html(oldVal);
					layer.alert('标签已存在');
				}
			}
		})
	});

```

# row select
```javascript
        layui.use(['table', 'form', 'laydate', 'util'], function () {
            var cols = [
                { title: '选中', type: 'checkbox', LAY_CHECKED: false }
            ];
            form.on('submit(product-btn)', function (data) {
                var elementId = data.elem.id;
                if (obj != null && obj.length === 1) {
                    var product = obj[0];
                    var elementList = product.elementList;
                    let row = {
                    };
                    tableData.push(row);
                    cols[0].LAY_CHECKED = false;
                    tableInstance.reload({
                        data: tableData,
                        cols: [cols]
                    });
                    let d = table.cache['product-table'];
                    d[(d.length - 1)].LAY_CHECKED=true;
                    tableInstance.reload({
                        data: tableData,
                        cols: [cols]
                    });
                }
                return;
            });

            table.on('tool(product)', function (obj) {
                var data = obj.data;
                if (obj.event === 'getType') {
                    typeId = 0;
                    var elementList = data.elementList;
                    var type = data.type;
                    var tid = type.id;
                    $("#type-check-div").empty();
                    elementList.forEach(function (item) {
                        var ele = '<input type="radio" name="type" value='
                            + item.id
                            + ' title="'
                            + item.remark
                            + '">';
                        $("#type-check-div").append(ele);
                    });
                    form.val("type-form", {
                        "type": tid + ''
                    });
                    form.render('radio', 'type-form');
                }
            });
        });
```
