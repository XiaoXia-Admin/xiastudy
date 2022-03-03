//获取随机数，不与之前的重复
import cookie from "js-cookie";
import store from "../store";
import E from "wangeditor";

export function randomNum(min, max) {
  let num = Math.floor(Math.random() * (max - min) + min)
  while (this.flag === num) {
    num = Math.floor(Math.random() * (max - min) + min)
  }
  this.flag = num;
  this.flagRecord = this.flag;
  return num;
}

//监控滚动盖度
export function scrollTop() {
  // 页面滚动距顶部距离
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
    document.body.scrollTop
  if (scrollTop > 249 && this.slideShow) {
    this.show = true;
  } else {
    this.show = false;
    this.slideShow = true
  }
  if (this.slideArray.length != 0) {
    this.slideArray.forEach((val, index, arr) => {
      if (document.getElementById(arr[index].id) != null) {
        if ((arr[index].distance - 150 < scrollTop && (scrollTop) < arr[(Number(index) + 1) > this.slideArray.length ? index : Number(index) + 1].distance - 150) || (arr[index].distance - 150 < (scrollTop) && arr[(Number(index) + 1) > this.slideArray.length ? index : Number(index) + 1].distance == -1)) {
          document.getElementById(arr[index].id).style.setProperty("color", "#fff")
          document.getElementById(arr[index].id).style.setProperty("background-color", "#00a1d6")
        } else {
          document.getElementById(arr[index].id).style.setProperty("color", "#000000")
          document.getElementById(arr[index].id).style.setProperty("background-color", "#fff")
        }
      }
    })
  }
}

//返回顶部
export function backToTop(item) {
  let backPosition
  let i = 0;
  let distanceY = window.pageYOffset;
  if ("slide_bottom" === item) {
    backPosition = 95;
  } else {
    backPosition = document.getElementById(item).offsetTop;
  }
  this.interval = setInterval(() => {
    let next = Math.floor(this.easeInOutQuad(10 * i, distanceY, -distanceY, 500))
    if (next <= (backPosition + 95)) {
      window.scrollTo(0, (backPosition - 95))
      clearInterval(this.interval)
    } else {
      window.scrollTo(0, next)
    }
    i--
  }, 0.5)
}

// 设置返回的过渡动画
export function easeInOutQuad(t, b, c, d) {
  // 判断当前时间是否总在总时间的一半以内，是的话执行缓入函数，否则的话执行缓出函数
  if ((t /= d / 2) < 1) {
    return (c / 2 * t * t + b)
  } else {
    // 将总长度设置为一半，并且时间从当前开始递减，对图像进行垂直向上平移
    return -c / 2 * (--t * (t - 2) - 1) + b
  }
}

export function delay(second) {
  return 'delay-' + second + 's'
}

export function slideArrayTop() {
  let array = new Array();
  let i = 0;
  this.slideTitleList.forEach(el => {
    array.push({id: el.id, distance: document.getElementById(this.categoryList[i].id).offsetTop});
    i++;
  })
  array.push({id: 'replace', distance: -1})
  this.slideArray = array;
}

export function layuiOpen() {
  let index = layer.open({
    type: 1,
    id: 'navOpen',
    content: `
 <div class="login-content">
    <div id="wxLogin" style="display: block">
      <div class="login_title" style="">打开微信扫一扫登录/注册</div>
      <div class="wx-qr-code-img">
        <div>
          <div class="img">
            <a class="weixin-login weixin-login-btn" href="http://localhost:8160/user/wx/login">
              <i class="iconfont icon-weixin1"></i>微信扫描注册/登录
            </a>
          </div>
          <div class="form-bottom" id="wxLoginLink">
            <p class="weixin-text">
              <a class="weixin-login ksd-login"  data-index="1" href="javascript:void(0);">账号登录</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div id="userLogin" style="display: none">
      <div class="login_title">账号登录</div>
      <div class="form-login">
        <div class="usernameBox">
          <input type="text" id="loginAct" class="cyinput1 form-control ksd-account-phone" autofocus="autofocus" maxlength="20" placeholder="请输入手机号 或 用户数字编号 登录">
        </div>
        <div class="usernameBox">
          <input type="password" id="loginPwd" class="cyinput1 form-control ksd-account-pwd" maxlength="18" placeholder="请输入6-18位密码">
        </div>
        <button class="cymyloginbutton goLogin account-login" id="userLoginBtn">登录</button>
        <div class="form-bottom" style="margin:20px 0">
          <p class="weixin-text">
            <a class="weixin-login ksd-login" data-index="0" href="javascript:void(0);" id="userLoginLink">微信扫描注册/登录</a>
          </p>
        </div>

      </div>
    </div>
  </div>
  <script>
$(function () {
        $("#wxLoginLink").click(function () {
            $("#wxLogin").css("display","none")
            $("#userLogin").css("display","block")
        })
        $("#userLoginLink").click(function () {
            $("#userLogin").css("display","none")
            $("#wxLogin").css("display","block")
        })
        $("#userLoginBtn").click(function (){
            let loginAct = $.trim($("#loginAct").val());
            let loginPwd = $.trim($("#loginPwd").val());
            if (loginAct == "") {
                layer.tips('用户名不能为空', '#loginAct', {
                    tips: [1, 'black'],
                    time: 4000
                   });
                return false;
            }
            if(loginPwd == "") {
                    layer.tips('密码不能为空', '#loginPwd', {
                    tips: [1, 'black'],
                    time: 4000
                  });
                    return false;
             }
            $.ajax({
                url: "http://localhost:8160/user/account/login",
                data: {
                    "loginAct": loginAct,
                    "loginPwd": loginPwd
                },
                type: "post",
                dataType: "json",
                success: function (data) {
                    if (!data.account) {
                        layer.msg('输入的账号尚未注册，请用微信扫码登录', {icon: 2,time: 1500,offset: '200px'});
                    }
                    if (!data.verify) {
                        $("#loginPwd").val("")
                        layer.tips('密码输入错误', '#loginPwd', {
                          tips: [1, 'black'],
                          time: 4000
                        });
                    }

                    if (data.account && data.verify) {
                        let index = layer.load(3, '#userLoginBtn', {time: 1});
                        window.location.href = '/login?index='+index + '&account=' +loginAct;
                        layer.close(index);
                    }
                }
            })
        })
    })
</script>
`,
    skin: 'box',
    offset: '100px',
    area: ['500px', '450px'],
    title: false,
    resize: false,
    btn: '',
    anim: 1,
    scrollbar: false
  })
  layer.style(index, {
    borderRadius: '15px'
  });
}

// ,path,vm
export function layuiBack(btn1, btn2, path) {

  layer.confirm(`<span style="margin:auto 97px">你确定要离开吗？</span>`, {
    btn: [btn1, btn2] //按钮
  }, function () {
    window.location.href = path
  }, function () {

  });
}

export function layuiDownload(btn1, btn2) {
  if (typeof store.state.token == 'undefined') {
    layuiOpen()
  } else {
    layer.confirm(`<span style="margin:auto 97px">点击下载将会扣除对应K币,且K币不会退还!</span>`, {
      btn: [btn1, btn2] //按钮
    }, function () {
      layer.msg('正在请求资源', {icon: 1});
    }, function () {
      layer.msg('已取消下载', {
        time: 5000, //20s后自动关闭
      });
    });
  }
}

export function cancelSign() {
  this.sign = false
  if (this.$refs.signature.value != 'TA很懒，什么都没有留下...') {
    this.inputValue = this.$refs.signature.value;
  }
}

export function loginOut() {
  layer.confirm(`<span style="text-align: center;">你确定要离开吗？</span>`, {
    title: '登出提示',
    btn: ['点击离开', '继续学习']
  }, function () {
    cookie.remove('wx_token')
    location.href = "/login";
    //触发后禁止浏览器的后退键
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function (e) {
      history.pushState(null, null, document.URL);
    }, false);
  }, function () {

  });

}

// <span style="margin:auto 97px">点击下载将会扣除对应K币,且K币不会退还!</span>
export function exchangeAvatar(avatar) {
  layer.confirm(`<p>一旦修改为默认头像，则无法切换为微信头像！<br><span style="margin: 80px">是否确认此操作?</span></p>`,
    {
      btnAlign: 'c',
      data: {
        _this: this,
        ava: avatar
      }
    }, function (index) {
      // console.log(e.target.dataset.img)
      this.data._this.$store.commit("editAvatar", this.data.ava)
      layer.msg('修改成功');
      layer.close(index);
    }, function () {

    });
}

export function openEmail() {
  // let index = layer.load(2, {time: 1000}); //又换了种风格，并且设定最长等待10秒
  let index = layer.open({
    id: 'navOpen',
    data: {
      _this: this,
      flag: 'haa'
    },
    content: `
         <div class="the-content" style="padding: 10px">
          <div class="the-forms">
              <div class="overflow-hidden">
                  <input type="text" class="login_ipt error" id="add_update_email" maxlength="200" value="" placeholder="请输入您的邮箱...">
              </div>
              <div class="updateBtn" id="updateBtn">
                  <button type="button">修改邮箱</button>
              </div>
          </div>
         </div>
            <script>
               $(function () {
                   $("#updateBtn").click(function () {
                      let value = $("#add_update_email").val()
                      let reg = /^\\w+@[a-z0-9]+\\.[a-z]{2,4}$/
                      if(value == '') {
                        layer.tips('请输入邮箱', '#add_update_email', {
                          tips: [1, 'black'],
                          time: 2000
                        });
                      } else if(!reg.test(value)) {
                          layer.tips('请输入正确的邮箱', '#add_update_email', {
                          tips: [1, 'black'],
                          time: 2000
                        });
                      } else {
                          // alert(value)
                          document.getElementById('ksd-bg-email').innerText = value
                          layer.close(100001)
                          // alert(this.$store.state.email);
                          // this.data._this.email = value

                          // this.$store.commit("updateFlag")
                      }
                  })
               })
            </script>
        `,
    area: ['400px', '160px'],
    skin: 'box',
    title: false,
    resize: false,
    btn: '',
    anim: 1,
    scrollbar: false,
  })
}

export function editorBtn() {
  if (!this.$refs.pwdinput.value) {
    layer.msg("请输入密码");
  } else if (this.$refs.pwdinput.value.length < 6) {
    layer.msg("密码最少六位")
  } else {
    let index = layer.confirm(`
            &nbsp;&nbsp;&nbsp;&nbsp是否确认此操作?
      `, {
      title: '提示',
      data: {
        _this: this
      }
    }, function (index) {
      this.data._this.pwdFlag = true;
      this.data._this.pwd = $('#updatepwd').val();
      layer.close(index); //如果设定了yes回调，需进行手工关闭
    });
  }
}


export function indexOfFlag(str) {
  return this.$route.path.indexOf(str) !== -1;
}

export function windowsIndexOf(str) {
  return window.location.href.indexOf(str) != -1
}

export function pathHop(path) {
  this.me = false
  this.friend = false
  this.system = false
  this.replay = false
  this.course = false
  if (path == '/msg') {
    this.me = true
  } else if (path == '/msg/friend') {
    this.friend = true
  } else if (path == '/msg/replay') {
    this.replay = true
  } else if (path == '/msg/system') {
    this.system = true
  } else if (path == '/msg/course') {
    this.course = true
  }
  this.$router.push(path)
}


export function slideTop() {
  // 页面滚动距顶部距离
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
    document.body.scrollTop
  if (scrollTop > 70) {
    this.slide = true;
  } else {
    this.slide = false;
  }
}

export function bottomExchange(path) {
  this.home = false;
  this.article = false;
  this.special = false;
  this.study = false;
  this.talk = false;
  this.setting = false;
  this.follow = false;
  this.fans = false;

  if (path == 'home') {
    this.home = true
  } else if (path == 'article') {
    this.article = true;
  } else if (path == 'special') {
    this.special = true;
  } else if (path == 'study') {
    this.study = true;
  } else if (path == 'talk') {
    this.talk = true;
  } else if (path == 'setting') {
    this.setting = true;
  } else if (path == 'follow') {
    this.follow = true;
  } else if (path == 'fans') {
    this.fans = true;
  }
}

export function userPage(path) {
  this.bottomExchange(path);
  this.$router.push('/user/' + path);
}

// export function userPreviewPage(path) {
//   this.bottomExchange(path);
//   this.$router.push('/other/user/other' + path);
// }

export function createEditor() {
  const SINA_URL_PATH = 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal'
  const editor = new E("#commentarea")
  editor.config.menus = [
    'bold',
    'list',
    'emoticon',
  ]
  editor.config.emotions = [
    {
      title: '新浪', // tab 的标题
      type: 'image', // 'emoji' 或 'image' ，即 emoji 形式或者图片形式
      content: [
        {alt: '[坏笑]', src: `${SINA_URL_PATH}/50/pcmoren_huaixiao_org.png`},
        {alt: '[舔屏]', src: `${SINA_URL_PATH}/40/pcmoren_tian_org.png`},
        {alt: '[污]', src: `${SINA_URL_PATH}/3c/pcmoren_wu_org.png`},
      ]
    },
    {
      title: 'emoji',  // tab 的标题
      type: 'emoji', // 'emoji' / 'image'
      // emoji 表情，content 是一个数组即可
      content: '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐'.split(/\s/),
    }
  ]
  editor.config.placeholder = '嘿大神~，别默默看了快来评论一下吧!'
  editor.config.focus = false
  //修改光标初始位置
  editor.config.width = 1050
  editor.config.height = 200
  editor.config.showFullScreen = false
  editor.create()
}

export function init(id) {
  (async () => {
    await this.fetchScript('./static/lib/editormd/lib/marked.min.js')
    await this.fetchScript('./static/lib/editormd/lib/prettify.min.js')
    await this.fetchScript('./static/lib/editormd/lib/raphael.min.js')
    await this.fetchScript('./static/lib/editormd/lib/underscore.min.js')
    await this.fetchScript('./static/lib/editormd/lib/sequence-diagram.min.js')
    await this.fetchScript('./static/lib/editormd/lib/flowchart.min.js')
    await this.fetchScript('./static/lib/editormd/lib/jquery.flowchart.min.js')
    await this.fetchScript('./static/lib/editormd/editormd.min.js')
    await this.$nextTick(() => {
      this.editor = window.editormd.markdownToHTML(id, {
        htmlDecode: "style,script,iframe",  // you can filter tags decode
        emoji: true,
        taskList: true,
        tex: true,  // 默认不解析
        flowChart: true,  // 默认不解析
        sequenceDiagram: true,  // 默认不解析
        taskLists: true,
      })
    })

  })()

}

export function getLevel(exp) {
  if (exp < 1000) {
    return 0;
  } else if (exp >= 1000 && exp < 3000) {
    return 1;
  } else if (exp >= 3000 && exp < 9000) {
    return 2;
  } else if (exp >= 9000 && exp < 18000) {
    return 3;
  } else if (exp >= 18000 && exp < 36000) {
    return 4;
  } else if (exp >= 36000 && exp < 72000) {
    return 5;
  } else if (exp >= 72000) {
    return 6;
  }
}

//动画加载
export function loading(target, tip) {
  $('#loadingbox').show().css({padding: '30px 0', "textAlign": 'center'}).html("<div class=\"loading\">\n" +
    "  <h2>" + (tip || '数据努力挖掘中') + "</h2>\n" +
    "  <span></span>\n" +
    "  <span></span>\n" +
    "  <span></span>\n" +
    "  <span></span>\n" +
    "  <span></span>\n" +
    "  <span></span>\n" +
    "  <span></span>\n" +
    "</div>");
}

export function clear(target) {
  $(target).hide().empty();
}


/*给要预览的图片或者元素上加 class="ksd-imgbox"和data-src='图片地址即可'*/
export function mkImageShow() {
  let ow = window.innerWidth;
  let oh = window.innerHeight;
  // $(window).resize(function () {
  //   let imgBox = $(".ksd-imgcontainer");
  //   let imgSrc = imgBox.find(".ksd-imgcnt").find("img").attr("src");
  //   if (isEmpty(imgSrc)) return;
  //   let xbit = this.innerWidth / ow;
  //   let ybit = this.innerHeight / oh;
  //   let width = imgBox.data("width") * 1;
  //   let height = imgBox.data("height") * 1;
  //   let wb = width * xbit;
  //   let yb = height * ybit;
  //
  //   loadingImage(imgSrc, function (ok) {
  //     if (ok) {
  //       let imgJson = resizeImg(this, wb, yb);
  //       let cwidth = imgJson.width;
  //       let cheight = imgJson.height;
  //       imgBox.find(".ksd-imgcnt").stop(true, true).animate({
  //         width: cwidth,
  //         height: cheight,
  //         marginLeft: "-" + (cwidth / 2) + "px",
  //         marginTop: "-" + (cheight / 2) + "px"
  //       });
  //       imgBox.find(".ksd-imgcnt").find("img").attr("width", cwidth).attr("height", cheight);
  //     } else {
  //       alert("远程服务商禁止下载图片。无法提供预览");
  //       $(".ksd-imgoverlay,.ksd-imgcontainer").remove();
  //     }
  //   });
  //
  // });
  $("#zl").off("click").on("click", "img", function (e) {
    let imgSrc = $(this).attr("src");
    if (isEmpty(imgSrc)) imgSrc = $(this).data("src").replace(",", "");
    $(".ksd-imgoverlay,.ksd-imgcontainer").remove();
    loadingImage(imgSrc, function (ok) {
      if (ok) {
        let bw = 1920;
        let bh = 900;
        if (bw >= ow) bw = ow;
        if (bh >= oh) bh = oh - 100;
        let imgJson = resizeImg(this, bw, bh);
        let width = imgJson.width;
        let height = imgJson.height;
        let html = "<div class='ksd-imgcontainer' data-width='" + width + "' data-height='" + height + "'>" +
          "  		<div class='ksd-imgcnt'  style='width:" + width + "px;height:" + height + "px;margin-left:-" + (width / 2) + "px;margin-top:-" + (height / 2) + "px;'>" +
          "  			<img class='animated bounceIn' src='" + imgSrc + "' width='" + width + "' height='" + height + "'>" +
          "  		</div><a href='javascript:void(0);' class='ksd-imgclose'><i class='iconfont icon-chahao'></i></a>" +
          "  	</div>";
        $("body").append(html).append("<div class=\"tipoff-block js-tipoff-block\"></div>");
        $(".ksd-imgcontainer").off("click").on("click", function () {
          $(this).next().remove();
          $(this).remove();
        });
        // clearInterval(this.ctttimer);
      } else {
        alert("服务商禁止下载图片或者加载失败，无法提供预览");
        $(".ksd-imgoverlay,.ksd-imgcontainer").remove();
        // clearInterval(this.ctttimer);
      }
    });
    e.stopPropagation();
  });
  $("#preview").off("click").on("click", "img", function (e) {
    let imgSrc = $(this).attr("src");
    if (isEmpty(imgSrc)) imgSrc = $(this).data("src").replace(",", "");
    $(".ksd-imgoverlay,.ksd-imgcontainer").remove();
    loadingImage(imgSrc, function (ok) {
      if (ok) {
        let bw = 1920;
        let bh = 900;
        if (bw >= ow) bw = ow;
        if (bh >= oh) bh = oh - 100;
        let imgJson = resizeImg(this, bw, bh);
        let width = imgJson.width;
        let height = imgJson.height;
        let html = "<div class='ksd-imgcontainer' data-width='" + width + "' data-height='" + height + "'>" +
          "  		<div class='ksd-imgcnt'  style='width:" + width + "px;height:" + height + "px;margin-left:-" + (width / 2) + "px;margin-top:-" + (height / 2) + "px;'>" +
          "  			<img class='animated bounceIn' src='" + imgSrc + "' width='" + width + "' height='" + height + "'>" +
          "  		</div><a href='javascript:void(0);' class='ksd-imgclose'><i class='iconfont icon-chahao'></i></a>" +
          "  	</div>";
        $("body").append(html).append("<div class=\"tipoff-block js-tipoff-block\"></div>");
        $(".ksd-imgcontainer").off("click").on("click", function () {
          $(this).next().remove();
          $(this).remove();
        });
        // clearInterval(this.ctttimer);
      } else {
        alert("服务商禁止下载图片或者加载失败，无法提供预览");
        $(".ksd-imgoverlay,.ksd-imgcontainer").remove();
        // clearInterval(this.ctttimer);
      }
    });
    e.stopPropagation();
  });
  // $("#app").off("click").on("click", ".ksd-imgshow", function (e) {
  //   let imgSrc = $(this).data("src");
  //   if (isEmpty(imgSrc)) imgSrc = $(this).data("src").replace(",", "");
  //   $(".ksd-imgoverlay,.ksd-imgcontainer").remove();
  //   loadingImage(imgSrc, function (ok) {
  //     if (ok) {
  //       let bw = 1920;
  //       let bh = 900;
  //       if (bw >= ow) bw = ow;
  //       if (bh >= oh) bh = oh - 100;
  //       let imgJson = resizeImg(this, bw, bh);
  //       let width = imgJson.width;
  //       let height = imgJson.height;
  //       let html = "<div class='ksd-imgcontainer' data-width='" + width + "' data-height='" + height + "'>" +
  //         "  		<div class='ksd-imgcnt'  style='width:" + width + "px;height:" + height + "px;margin-left:-" + (width / 2) + "px;margin-top:-" + (height / 2) + "px;'>" +
  //         "  			<img class='animated bounceIn' src='" + imgSrc + "' onerror='imgErrorTip(this)' width='" + width + "' height='" + height + "'>" +
  //         "  		</div><a href='javascript:void(0);' class='ksd-imgclose'><i class='iconfont iconremove1'></i></a>" +
  //         "  	</div>";
  //       $("body").append(html).append("<div class='ksd-imgoverlay'></div>");
  //
  //       $(".ksd-imgcontainer").off("click").on("click", function () {
  //         $(this).next().remove();
  //         $(this).remove();
  //       });
  //     } else {
  //       alert("服务商禁止下载图片或者加载失败，无法提供预览");
  //       $(".ksd-imgoverlay,.ksd-imgcontainer").remove();
  //     }
  //   });
  //
  //   e.stopPropagation();
  // });
  //
  // $(".ksdimgbox").off("click").on("click", ".ksd-imgshow", function (e) {
  //   let imgSrc = $(this).data("src");
  //   if (isEmpty(imgSrc)) imgSrc = $(this).data("src").replace(",", "");
  //   $(".ksd-imgoverlay,.ksd-imgcontainer").remove();
  //   loadingImage(imgSrc, function (ok) {
  //     if (ok) {
  //       let bw = 1920;
  //       let bh = 900;
  //       if (bw >= ow) bw = ow;
  //       if (bh >= oh) bh = oh - 100;
  //       let imgJson = resizeImg(this, bw, bh);
  //       let width = imgJson.width;
  //       let height = imgJson.height;
  //       let html = "<div class='ksd-imgcontainer' data-width='" + width + "' data-height='" + height + "'>" +
  //         "  		<div class='ksd-imgcnt'  style='width:" + width + "px;height:" + height + "px;margin-left:-" + (width / 2) + "px;margin-top:-" + (height / 2) + "px;'>" +
  //         "  			<img class='animated bounceIn' src='" + imgSrc + "' onerror='imgErrorTip(this)' width='" + width + "' height='" + height + "'>" +
  //         "  		</div><a href='javascript:void(0);' class='ksd-imgclose'><i class='iconfont iconremove1'></i></a>" +
  //         "  	</div>";
  //       $("body").append(html).append("<div class='ksd-imgoverlay'></div>");
  //
  //       $(".ksd-imgcontainer").off("click").on("click", function () {
  //         $(this).next().remove();
  //         $(this).remove();
  //       });
  //     } else {
  //       alert("服务商禁止下载图片或者加载失败，无法提供预览");
  //       $(".ksd-imgoverlay,.ksd-imgcontainer").remove();
  //     }
  //   });
  //
  //   e.stopPropagation();
  // });
}

export function isEmpty(val) {
  val = $.trim(val);
  if (val == null)
    return true;
  if (val == undefined || val == 'undefined')
    return true;
  if (val == "")
    return true;
  if (val.length == 0)
    return true;
  if (!/[^(^\s*)|(\s*$)]/.test(val))
    return true;
  return false;
}


export function loadingImage(src, callback) {
  let img = new Image();
  img.src = src;
  if (img.complete) {
    callback.call(img, true);
  } else {
    img.onload = function () {
      callback.call(img, true);
    };
    img.onerror = function () {
      callback.call({}, false);
    };
  }
};

export function resizeImg(img, iwidth, iheight) {
  let image = img;
  let boxWH = {};
  if (image.width > 0 && image.height > 0) {
    boxWH.width = image.width;
    boxWH.height = image.height;
    if (boxWH.width > iwidth) {
      boxWH.height = (boxWH.height * iwidth) / boxWH.width;
      boxWH.width = iwidth;

    }
    if (boxWH.height > iheight) {
      boxWH.width = (boxWH.width * iheight) / boxWH.height;
      ;
      boxWH.height = iheight;
    }
  }
  return boxWH;
}

export function loadToc() {
  // 加载目录
  $(".expand-chapterlist").on("click", function () {
    if ($("#ksd-chapterlist").is(":hidden")) {
      $("#ksd-chapterlist").show();
      $(".bottomBg").hide();
      $(this).find("span.msg").text("收起目录");
      $(".ksd-topic-add").hide();
      $(".ksd-topic-minus").show();
      loadChapterHead();
    } else {
      $(".bottomBg").show();
      $(".ksd-topic-add").show();
      $(".ksd-topic-minus").hide();
      $(this).find("span.msg").text("展开目录");
      $("#ksd-chapterlist").hide();
    }
  });
}

export function loadChapterHead() {
  // 首先获取所有H标签，若页面中有h4，h5，h6则可以添加到参数中
  let headList = [...document.getElementById("preview").querySelectorAll('h1,h2,h3,h4,h5,h6')];     // 将H标签构造成一棵树，就可以明确H标签之间的层级
  let root = {children: []};
  let h = {node: headList[0], children: [], parent: root};
  root.children.push(h)
  if (headList && headList.length > 0) {
    headList.reduce(function (pre, cur) {
      let n = {node: cur, children: []};
      while (h.node.localName[1] - n.node.localName[1] !== -1) {
        h = h.parent
        if (h === root) {
          break
        }
      }
      n.parent = h
      h.children.push(n)
      h = n
      return h
    })

    // 给H标签加id
    let position = 1

    function createList(list) {
      let text = list.reduce(function (pre, cur, index) {
        let childText = "";　　　　　　// 判断该H标签有没有子层H标签
        let expandIcon = "";
        if (cur.children.length) {
          expandIcon = "<i class='iconfont iconic_expand_more ml-2 pr tp2'></i>";
          childText = createList(cur.children)
        } else {
          childText = ''
        }
        cur.node.id = 'header' + position++
        pre += `<li style="list-style: none;">
                        <a href="#${cur.node.id}" class="toc-a" style="text-overflow: ellipsis;
overflow: hidden;
width: 264px;
white-space: nowrap;
display: block;color: #4183c4;padding: 2px;text-decoration: none;background-color: transparent;margin-bottom: 6px;">
                          ${cur.node.innerText}${expandIcon}
                        </a>
                        ${childText}
                      </li>`
        return pre
      }, '')
      text = `<ul> ${text} </ul>`
      return text
    }

    let content = createList(root.children)
    // clearInterval(this.time);
    let dom = document.getElementById('ksd-chapterlist');
    if (dom) dom.innerHTML = content
    $("#preview").find("a").attr("target", "_blank");
    $("#ksd-chapterlist").find("li").find("a").off("click").on("click", function (e) {
      $(this).next().toggle();
      $(this).find(".iconfont").toggleClass('iconic_expand_more iconic_expand_less');
      setTimeout(function () {
        let scrollTop = $(window).scrollTop();
        $(window).scrollTop(scrollTop - 70);
      }, 1000);
      e.stopPropagation();
    });
    // KsdTopic.loadEventPrview();
  } else {
    $(".ksd-chapterlist-box,.ksd-operator-expand").hide();
    // KsdTopic.loadEventPrview();
  }
}

// export function createList(list) {
//   let text = list.reduce(function (pre, cur) {
//     let childText = "";　　　　　　// 判断该H标签有没有子层H标签
//     let expandIcon = "";
//     if (cur.children.length) {
//       expandIcon = "<i class='iconfont iconic_expand_more ml-2 pr tp2'></i>";
//       childText = createList(cur.children)
//     } else {
//       childText = ''
//     }
//     cur.node.id = 'header' + index++
//     pre += `<li>
//                         <a href="#${cur.node.id}">
//                           ${cur.node.innerText}${expandIcon}
//                         </a>
//                         ${childText}
//                       </li>`
//     return pre
//   }, '')
//   text = `<ul> ${text} </ul>`
//   return text
// }
export function skinOrWrite() {
  if (!this.write && !this.skin) {
    document.getElementById('preview').className = 'markdown-body editormd-html-preview editormd-preview-theme-dark'
    return;
  } else if (!this.skin && this.write) {
    document.getElementById('preview').className = 'markdown-body editormd-html-preview editormd-preview-theme-dark fz-16'
    return;
  } else if (!this.write && this.skin) {
    document.getElementById('preview').className = 'markdown-body editormd-html-preview'
    return;
  } else if (this.write && this.skin) {
    document.getElementById('preview').className = 'markdown-body editormd-html-preview fz-16'
  }
}
