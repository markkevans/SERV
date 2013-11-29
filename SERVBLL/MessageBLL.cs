using System;
using System.Collections.Generic;
using System.Text;
using SERVIBLL;
using SERVDataContract;
using SERVDALFactory;
using SERV.Utils;
using System.Net.Mail;

namespace SERVBLL
{

	public class MessageBLL : IMessageBLL
	{

		private static Logger log = new Logger();

		private const string FROM = "noreply@system.servssl.org.uk";
		private const string SERVER = "localhost";
		private const string FOOTER = "\r\n\r\n\r\nThis message was sent from an unattended mailbox by the SERV SSL System.  Do not reply to this mail.  If you need to make contact, please use the Forum to PM Tristan Phillips.\r\n";

		public MessageBLL()
		{
		}

		public bool SendSMSMessage(string numbers, string message, int senderUserID)
		{
			numbers = numbers.Trim().Replace(" ", "");
			if (numbers.EndsWith(",")) { numbers = numbers.Substring(0, numbers.Length - 1); }
			SERVDALFactory.Factory.MessageDAL().LogSentSMSMessage(numbers, message, senderUserID);
			SERV.Utils.Messaging.SendTextMessage(numbers, message);
			return true;
		}

		public bool SendMemberUpdateEmail(Member m, User u, int senderUserID, bool onlyNeverLoggedIn)
		{
			DateTime? lastLoginDate = u.LastLoginDate;
			if (onlyNeverLoggedIn && lastLoginDate != null){ log.Debug("Skipping as member has logged in"); return true;}
			string tags = "";
			foreach (Tag t in m.Tags)
			{
				tags += "\"" + t.TagName + "\"   ";
			}
			string body = "Hi " + m.FirstName + ",\r\n\r\n" +
				"This is a periodical email from the SERV SSL system to confirm the data we hold about you.\r\n\r\n" +
					(
				    lastLoginDate == null ? 
						"We notice you have not yet logged into your account.  " +
						"It is essential that you do so to keep your contact details and volunteering preferences up to date.  " +
				              "Please goto http://system.servssl.org.uk ASAP.\r\n\r\n" 
						: 
					    "You last logged onto the system on " + ((DateTime)lastLoginDate).ToString("dd MMM yy HH:mm") + "\r\n\r\n"
				    ) +
				"Here are the details we currently hold for you.  Please check them and update them in the system if they are incorrect.\r\n\r\n" +
			              "First Name: " + m.FirstName + "\r\n" +
			              "Last Name: " + m.LastName + "\r\n" +
			              "Email: " + m.EmailAddress + "\r\n" +
			              "Mobile: " + m.MobileNumber + "\r\n" +
			              "Home Phone: " + m.HomeNumber + "\r\n" +
			              "Birth Year: " + m.BirthYear + "\r\n" +
			              "Occupation: " + m.Occupation + "\r\n" +
			              "Address: " + m.Address1 + " " + m.Address2 + " " + m.Address3 + " " + m.Town + " " + m.County + "\n" +
			              "Post Code: " + m.PostCode + "\r\n" +
			              "Next of Kin (NOK): " + m.NextOfKin + "\r\n" +
			              "NOK Address: " + m.NextOfKinAddress + "\r\n" +
			              "NOK Phone: " + m.NextOfKinPhone + "\r\n\r\n" +
				"Your preferences (Tags):\r\n\r\n" +
				tags + "\r\n\r\n" +
				"Thanks,\r\n\r\nSERV SSL System" + FOOTER;
			return SendEmail(m.EmailAddress, "SERV SSL Member Update", body, senderUserID);
		}

		public bool SendAllActiveMembersMembershipEmail(int senderUserID, bool onlyNeverLoggedIn)
		{
			List<Member> members = new MemberBLL().List("", true);
			foreach (Member m in members)
			{
				try
				{
					log.Debug(string.Format("Sending membership update to {0}", m.EmailAddress));
					SendMembershipEmail(m.EmailAddress, senderUserID, onlyNeverLoggedIn);
				}
				catch(Exception e)
				{
					log.Debug(string.Format("Membership update to {0} failed because {1}", m.EmailAddress, e.Message));
				}
			}
			return true;
		}

		public bool SendEmail(string address, string subject, string body, int senderUserID)
		{
			log.LogStart();
			log.Debug(string.Format("{0} >> {1} :: {2} seder: {3}", address, subject, body, senderUserID));
			System.Net.Mail.SmtpClient c = new SmtpClient(SERVER);
			MailMessage m = new MailMessage(FROM, address);
			m.Body = body;
			m.Subject = subject;
			SERVDALFactory.Factory.MessageDAL().LogSentEmailMessage(address, m.Subject + " :: " + m.Body, senderUserID);
			c.Send(m);
			return true;
		}

		public bool SendMembershipEmail(string address, int senderUserID, bool onlyNeverLoggedIn)
		{
			Member m = new MemberBLL().GetByEmail(address);
			if (m != null)
			{
				User u = new MemberBLL().GetUserForMember(m.MemberID);
				if (u != null)
				{
					return SendMemberUpdateEmail(m, u, senderUserID, onlyNeverLoggedIn);
				}
			}
			return false;
		}

	}
}

