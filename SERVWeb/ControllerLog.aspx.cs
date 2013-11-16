
namespace SERVWeb
{
	using System;
	using System.Web;
	using System.Web.UI;

	public partial class ControllerLog : System.Web.UI.Page
	{

		protected int MemberId
		{
			get 
			{
				return SERVGlobal.User.MemberID;
			}
		}

		protected int UserLevel
		{
			get 
			{
				return SERVGlobal.User.UserLevelID;
			}
		}

		protected override void OnLoad (EventArgs e)
		{
			SERVGlobal.AssertAuthentication();
		}

	}
}
