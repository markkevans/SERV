using System;
using System.Web;
using System.Web.Services;
using System.Collections.Generic;
using SERVDataContract;
using SERVBLLFactory;


namespace SERVWeb
{

    public class Service : System.Web.Services.WebService
    {

		[WebMethod]
		public List<Member> ListMembers()
		{
			return SERVBLLFactory.Factory.MemberBLL().List("");
		}

		[WebMethod(EnableSession = true)]
		public Member GetMember(int memberId)
		{
			return SERVBLLFactory.Factory.MemberBLL().Get(memberId);
		}

		[WebMethod]
		public List<Member> SearchMembers(string search)
		{
			return SERVBLLFactory.Factory.MemberBLL().List(search);
		}

		[WebMethod]
		public SERVUser Login(string username, string passwordHash)
		{
			return SERVBLLFactory.Factory.MemberBLL().Login(username, passwordHash);
		}

    }
}

