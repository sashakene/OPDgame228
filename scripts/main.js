import * as PlayerScripts from "./player.js";
import * as WeaponScripts from "./weapon.js";

// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";
runOnStartup(async (runtime) => {
    // Code to run on the loading screen.
    // Note layouts, objects etc. are not yet available.
    runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});
async function OnBeforeProjectStart(runtime) {
    // Code to run just before 'On start of layout' on
    // the first layout. Loading has finished and initial
    // instances are created and available to use here.
    runtime.addEventListener("tick", () => Tick(runtime));
}
let newlevel = true;
let level = 1;
function Tick(runtime) {
    const player = runtime.objects.Player.getFirstInstance();
    const levelTrigger = runtime.objects.LevelSwitchTrigger.getFirstInstance();
    const mouse = runtime.mouse;
    const robot = runtime.objects.Robot.getFirstInstance();
    const lazer=runtime.objects.LazwrRay.getFirstInstance();

    PlayerScripts.Main(runtime, player, mouse);
    
    if (robot!==null && robot.animationFrameTag=='end')
        robot.setAnimation('idle')

    if (runtime.collisions.testOverlap(player, levelTrigger) && newlevel) {
        newlevel = false;
        level++;
        runtime.goToLayout('level' + level);
        newlevel = true;
    }

    //the hell it is not working on level 3?
    if (runtime.collisions.testOverlap(player, lazer)) {
        runtime.goToLayout('level' + level);
    }
}