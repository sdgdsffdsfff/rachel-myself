<?php Aifang\Web\Resource::addJS(array('ui.autocomplete'));?>
<?php Aifang\Web\Resource::addCSS(array('css/autocomplete'));?>

<div class="header">
    <div>
        <input type="text" class="fi-text fi-huge" id="auto_ipt">
        <i class="iconfont icon-search">&#xe606;</i>
        <i class="iconfont icon-cancel" id="cancel_all">&#xe605;</i>
    </div>
        <a href="javascript:;" class="com-btn btn-big btn-succ btn-cancel" id="btn_cancel">取消</a>
</div>
<div class="auto-content" id="auto_content">
    <!-- <div class="item" data-name="仁恒河滨城（一至三期）">仁恒河滨城（一至三期）</div> -->
</div>

<script type="text/html" id="autocomplete_tpl">
    <% for ( var i = 0; i < names.length; i++ ) { %>
        <div class="item" data-id="<%=names[i].id%>" data-name="<%=names[i].name%>" data-cityid="<%=names[i].city_id%>">
            <h3 class="h4"><%=names[i].name%></h3>
            <p><%=names[i].address%></p>
        </div>
    <% } %>
</script>
