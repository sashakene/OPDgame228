export function Main(runtime, entyty, gun, mouse)
{
    gun.x=entyty.x;
    gun.y=entyty.y;
    gun.angle = Math.atan2(mouse.getMouseY() - gun.y, mouse.getMouseX() - gun.x);
}
export function Fire(runtime, gun)
{
    if(runtime.mouse.isMouseButtonDown(0)){
        gun.setAnimation('shoot');
        const firePoint=gun.getImagePoint(1);
        const bullet=runtime.objects.Bullet.createInstance(0,firePoint[0], firePoint[1]);
        bullet.angle=gun.angle;
        setTimeout(() => {
            gun.setAnimation('normal');
        }, 100);
    }
}