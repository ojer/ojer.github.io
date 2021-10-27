# @Select.md
```java

 @Results(value = {
            @Result(column = "user_id", property = "userId", id = true),
            @Result(property = "labelList", javaType = List.class, column = "user_id",
                    many = @Many(select = "com.imageadd.cloud.dao.UserLabelMapper.getUserLabelList")),
            @Result(property = "groupList", javaType = List.class, column = "user_id",
                    many = @Many(select = "com.imageadd.cloud.mapper.GroupUserMapper.getUserGroupList")),
            @Result(property = "contributionVal", javaType = Integer.class, column = "{userId = user_id,year = year}", one = @One(select = "com.imageadd.cloud.mapper.ResourceContributionMapper.getByUserId")),
    })
  @Select({
            "<script>",
            "SELECT " +
                    "tst.id, " +
                    "tst.tasks_name, " +
                    "tst.tasks_aim, " +
                    "tstu.user_id as userId, " +
                    "tu.user_name as username, " +
                    "tu.user_telphone as userPhoneNum " +
                    "from " +
                    "tb_study_tasks tst " +
                    "left join tb_study_tasks_user tstu on " +
                    "(tst.id = tstu.tasks_id) " +
                    "left join tb_user tu on " +
                    "(tstu.user_id = tu.user_id) " +
                    "where " +
                    "tst.is_deleted = 0  " +
                    "and " +
                    "tstu.is_deleted = 0 ",
            "<when test='tasksIdList != null and tasksIdList.size > 0'>",
            "and tstu.tasks_id in ",
            "<foreach collection='tasksIdList' item='tid' open='(' separator=',' close=')'>",
            "#{ tid }",
            "</foreach>",
            "</when>",
            "<when test='userIdList != null and userIdList.size > 0'>",
            "and tstu.user_id in ",
            "<foreach collection='userIdList' item='uid' open='(' separator=',' close=')'>",
            "#{ uid }",
            "</foreach>",
            "and tu.del_tag = 0 ",
            "</when>",
            "</script>"
    })
    select(IPage<Object> page, QueryWrapper<User> queryWrapper, @Param("year") String year);
}

```
