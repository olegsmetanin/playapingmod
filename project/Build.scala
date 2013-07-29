import sbt._
import Keys._
import play.Project._
import SbtGruntPlugin._
import SbtKarmaPlugin._

object ApplicationBuild extends Build {

    val appName         = "playapingmod"
    val appVersion      = "1.0"

    val appDependencies = Seq(
      // Add your project dependencies here,
    )

    val main = play.Project(appName, appVersion, appDependencies).settings(
      playAssetsDirectories <+= baseDirectory / "modules"
      // Add your own project settings here
		//(compile in Compile) <<= (compile in Compile) dependsOn (gruntTask(""))

    )

}