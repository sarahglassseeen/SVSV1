
// Chuyển Hướng Web
        window.history.replaceState({},document.title,window.location.href="#/my-profile/")


// Xoá cookie web

 document.querySelector('.delete-cookies').addEventListener('click', function(event) {
        event.preventDefault();
        document.cookie.split(";").forEach(function(c) { 
            document.cookie = c.trim().split("=")[0] + 
                '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/'; 
        });
        location.reload();
    });