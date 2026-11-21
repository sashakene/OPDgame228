let canDash=true;
let dashing=false;

export function Main(runtime, player, mouse){
    Dash(runtime, player, mouse);
    if(!dashing){
        Move(runtime,player);
        Anim(runtime, player);
    }
    GetHit(runtime, player);
}

function Move(runtime, player) {

    if (runtime.keyboard.isKeyDown('KeyA') && !runtime.keyboard.isKeyDown('KeyD')) {
        player.behaviors.Platform.simulateControl('left');
        player.width = -Math.abs(player.width);
    }

    if (runtime.keyboard.isKeyDown('KeyD') && !runtime.keyboard.isKeyDown('KeyA')) {
        player.behaviors.Platform.simulateControl('right');
        player.width = Math.abs(player.width);
    }

    if (runtime.keyboard.isKeyDown('KeyW')){
        player.behaviors.Platform.simulateControl('jump');
    }

    if (runtime.keyboard.isKeyDown('KeyS'))
        player.behaviors.Platform.fallThrough();
}

function Anim(runtime, player) {
        if (!player.behaviors.Platform.isOnFloor)
            player.setAnimation('jump');
        else if (Math.abs(player.behaviors.Platform.vectorX) > 100 &&
            (runtime.keyboard.isKeyDown('KeyA') || runtime.keyboard.isKeyDown('KeyD')))
            player.setAnimation('run');
        else
            player.setAnimation('idle');
    
}

function Dash(runtime, player, mouse) {
    if (runtime.keyboard.isKeyDown(16) && canDash) {
        canDash = false;
        dashing=true;
        player.setAnimation('dash');
        let ang = Math.atan2(mouse.getMouseY() - player.y, mouse.getMouseX() - player.x);
        player.angle = ang;
        player.width = Math.abs(player.width); //чтобы не мирорило, если нажали А
        if(ang>=3.1415/2 || ang<=-3.1415/2)
            player.height = -Math.abs(player.height);
        player.behaviors.Bullet.speed = 1500;
        player.behaviors.Platform.gravity = 0;
        player.behaviors.Platform.isIgnoringInput = true;
        player.behaviors.Bullet.isEnabled = true;
        //player.width = Math.abs(player.width);
        setTimeout(() => {
            dashing=false;
            player.angle = 0;
            player.height = Math.abs(player.height);
            player.behaviors.Platform.gravity = 1500;
            player.behaviors.Bullet.isEnabled = false;
            player.behaviors.Platform.isIgnoringInput = false;
            player.setAnimation('jump');
        }, 200);
        setTimeout(() => {canDash=true}, 1200);

        
    } 
}

function GetHit(runtime, player){
    for(const bullet of runtime.objects.Bullet.instances()){
        if(runtime.collisions.testOverlap(player, bullet)){
            bullet.destroy();
            player.instVars.HitPoints-=1;
        }
    }
    for(const lazerray of runtime.objects.LazwrRay.instances()){
        if(runtime.collisions.testOverlap(player, lazerray)){
            setTimeout(()=>{player.instVars.HitPoints-=1;},40);
        }
    }
}