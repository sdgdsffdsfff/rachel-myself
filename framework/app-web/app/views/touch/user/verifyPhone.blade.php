<?php Aifang\Web\Resource::addJS(array('app/verify-phone'));?>
<?php Aifang\Web\Resource::addCSS(array('css/verify-phone'));?>

@extends('layouts.touch')

@section('content')
<p class="h4 txt-muted">为了确保服务质量，请先验证您的手机号</p>
<input id="fiPhone" type="tel" <?php if($phone){?>value=<?php echo $phone .' '. 'readonly';}?> placeholder="请输入手机号" class="fi-text fi-huge fi-phone" maxlength="11" />
<div class="tip-container">
	<div class="verify-code">
	    <input id="fiCode" type="tel" placeholder="请输入验证码" class="fi-text fi-huge fi-code" maxlength="4" />
	    <a href="javascript:;" id="sendNum" class="com-btn btn-big btn-code btn-succ status-true btn-sendNum">获取验证码</a>
	</div>
	<p class="error-tip" id="errorTip" style="display: none;">手机号格式错误</p>
</div>

<a id="loginByPhone" href="javascript:;" class="com-btn btn-big btn-subscribe btn-succ">提&nbsp;交</a>
<script>
    var params = {
        redirect: '<?php echo $redirect;?>'
    };
</script>
@endsection

