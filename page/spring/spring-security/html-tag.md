```
<div sec:authorize="hasRole('SUPER_ADMINISTRATOR') || hasRole('ADMINISTRATOR') || hasRole('LECTURER')"></div>

<div th:if="${#authorization.expression('hasRole(''SUPER_ADMINISTRATOR'') || hasRole(''ADMINISTRATOR'') || principal.baseUser.competenceLevel > 4')}">
    <el-button size="mini" @click="showGroup()">发起活动组</el-button>
</div>
<div th:unless="${#authorization.expression('hasRole(''SUPER_ADMINISTRATOR'') || hasRole(''ADMINISTRATOR'') || principal.baseUser.competenceLevel > 4')}">
    <el-button size="mini" disabled>发起活动组</el-button>
</div>

```
