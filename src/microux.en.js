function Microux() {
  var vmMicro = this,
      icon = '',
      $             = document.querySelector.bind(document);
      header        = $('header'),
      messageDiv    = document.createElement('div'),
      messageClose  = document.createElement('button'),
      messageText   = document.createElement('p');
      messageDiv.classList.add('notification');
      messageClose.classList.add('close-button');

  messageDiv.addEventListener('click', function(){
    vmMicro.uiMessageDisabled();
  });

  this.uiMessage = function(message, classUI, icon){
    messageText.classList = classUI;
    messageText.innerHTML = message + icon;
    messageDiv.appendChild(messageText);
    messageDiv.appendChild(messageClose);
    header.appendChild(messageDiv);
  };

  this.uiMessageDisabled = function(){
    $('.notification').classList.add('disabled');
  };

  this.uiconnection = function(){
    this.isconnection = navigator.onLine;
    //connect
    if(this.isconnection && messageText.classList == 'online_status--off'){
      this.uiMessage('You\'ve connected to the internet again.', 'online_status--on notification_container', icon);
    }else if(!this.isconnection){
      //unconnection
      this.uiMessage('It seems like you lost internet connection.', 'online_status--off notification_container', icon);
    }
  };

  setInterval(function () {vmMicro.uiconnection();}, 2000);

  this.uiBattery = function(){
    var battery  = navigator.getBattery();
    battery.then(function(battery){
      updateLevel();
      battery.addEventListener('levelchange', function(){
        updateLevel();
      });

      battery.addEventListener('chargingchange', function(){
        updateCharge();
      });

      function updateCharge(){
        if(battery.charging){
          vmMicro.uiMessageDisabled();
        }
        updateLevel();
      }

      function updateLevel(){
        if((battery.level*100) < 30 && !battery.charging){
          icon = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="0" x1="795.88" y1="222.19" x2="795.82" y2="167.6" gradientUnits="userSpaceOnUse"><stop stop-color="#dc3c30"/><stop offset="1" stop-color="#ff786d"/></linearGradient></defs><g transform="matrix(.92857 0 0 .92857-706.94-149.37)"><path d="m788.46 167.32c-.794 0-1.299.643-1.299 1.436v4.309h-10.188c-.794 0-1.299.643-1.299 1.436v38.769 8.616c0 .793.52 1.436 1.313 1.436h37.33c.793 0 1.559-.643 1.559-1.436v-8.616-38.769c0-.793-.78-1.436-1.572-1.436h-9.914v-4.309c0-.793-.78-1.436-1.572-1.436h-14.36" fill="url(#0)"/><path d="m795.51 184.18c-1.242 0-2.246 1.018-2.246 2.24v13.486c0 1.237.997 2.239 2.246 2.239 1.244 0 2.246-1.018 2.246-2.239v-13.486c0-1.237-.995-2.24-2.246-2.24m0 22.457c-1.242 0-2.246 1-2.246 2.246 0 1.242 1 2.246 2.246 2.246 1.242 0 2.246-1 2.246-2.246 0-1.242-1-2.246-2.246-2.246" fill="#fdf0ef"/></g></svg>';
          vmMicro.uiMessage('It seems that your battery level is low.', 'battery_status--off notification_container', icon);
        }
      }
    });
  }
  this.uiBattery();
}
var microux = new Microux();
