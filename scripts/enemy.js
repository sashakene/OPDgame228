export function Main(runtime, enemy, player){
    if(enemy.behaviors.LineOfSight.hasLOStoPosition(player.x, player.y))
        enemy.instVars.Active=true;
    
    if(enemy.instVars.HitPoints<=0)
        enemy.destroy();

    if(enemy.instVars.Active==true){
        Activated(runtime, enemy, player);
    }

    GetHit(runtime, enemy, player);
}

function GetHit(runtime, enemy, player){
    for(const frbullet of runtime.objects.FriendlyBullet.instances()){
        if(runtime.collisions.testOverlap(enemy, frbullet)){
            frbullet.destroy();
            enemy.instVars.HitPoints-=1;
            enemy.instVars.Active=true;
        }
    }
}

function Activated(runtime, enemy, player){
    enemy.width=Math.abs(enemy.width)*(Math.sign(player.x - enemy.x) || 1)
    setTimeout(()=>Fire(runtime,enemy), 1000)
}

function Fire(runtime, enemy, player){
    enemy.setAnimation('attac');
    const [x,y]=enemy.getImagePoint(1);
    const bullet=runtime.objects.Bullet.createInstance(0, x, y);
    bullet.angle=Math.atan2(player.y-enemy.y, player.x-enemy.x);
}