(function () {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatControllerFn);

  /** @ngInject */
  function ChatControllerFn($scope, $http, Users, Chats) {
    var vm = this;
    // Data
    vm.users = Users.data;
    vm.chats = Chats.data;

    vm.selected = null;
    vm.userMessages = {};
    vm.glued = true;
    vm.messageToSend = "";

    vm.currentView = "chat-view";

    // Methods
    vm.openChat = openChat;
    vm.sendMessage = sendMessage;
    vm.deleteChat = deleteChat;

    init();

    ///////////

    function init() {

    }

    function openChat(chatId, chat) {
      vm.messageToSend = "";
      vm.userMessages = $http.get('app/main/apps/chat/data/messages/' + chatId + '.json')
        .then(function (response) {
          vm.selected = chat;
          return response.data;
        }, function (error) {
          return 'There was an error getting data' + error;
        });
      console.log("Loaded Messages : ",vm.userMessages);
    }

    function sendMessage(msg, who, $event, buttonClicked) {
      if ((buttonClicked || $event.keyCode == 13) && msg != "")
      {
        vm.userMessages.$$state.value.data.push({
          "id": vm.userMessages.$$state.value.data.length + 1,
          "who": who,
          "what": msg,
          "when": moment().format('HH:mm, DD/MM/YYYY')
        });
      vm.messageToSend = "";
      }
    }

    function deleteChat(selected) {
      var i = vm.chats.indexOf(selected);
      if(i > -1) {
        vm.chats.splice(i, 1);
        vm.selected = null;
      }
    }
  }
})();
