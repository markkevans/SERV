using System;

namespace SERV.Utils
{
	public class Messaging
	{

		static Logger log = new Logger();

		public Messaging()
		{
		}

		public static bool SendTextMessages(string numbers, string message)
		{
			numbers = numbers.Trim().Replace(" ", "");
			if (numbers.EndsWith(",")) { numbers = numbers.Substring(0, numbers.Length - 1); }
			SendTextMessage(numbers, message);
			return true;
		}

		public static string SendTextMessage(string to, string message)
		{
			string smsUser = System.Configuration.ConfigurationManager.AppSettings["SMSUser"];
			string smsPassword = System.Configuration.ConfigurationManager.AppSettings["SMSPassword"];
			string smsFrom = System.Configuration.ConfigurationManager.AppSettings["SMSFrom"];
			string res = new System.Net.WebClient().DownloadString(
				string.Format("http://services.dynmark.com/HttpServices/SendMessage.ashx?user={0}&password={1}&to={2}&from={3}&text={4}", 
				smsUser, smsPassword, to, smsFrom, message));
			log.Info("SMS: " + res);
			return res;
		}

	}
}

