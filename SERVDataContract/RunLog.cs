using System;
using System.Collections.Generic;
using SERV.Utils.Data;
using System.Text;
using System.Runtime.Serialization;
using SERV.Utils;

namespace SERVDataContract
{
	[DataContract]
	[Serializable]
	public class RunLog
	{

		public RunLog(){}

		public RunLog(SERVDataContract.DbLinq.RunLog metal)
		{
			PropertyMapper.MapProperties(metal, this);
		}

		public int RunLogID { get; set; }

		public int Boxes { get; set; }

		public Dictionary<string, int> Products
		{
			get;
			set;
		}

		public string Vehicle
		{
			get;
			set;
		}

		public DateTime? CallDateTime { get; set; }
		public string CallDate
		{
			get { return CallDateTime != null ? ((DateTime)CallDateTime).ToString("dd MMM yyyy") : ""; }
		}
		public string CallTime
		{
			get { return CallDateTime != null ? ((DateTime)CallDateTime).ToString("HH:mm") : ""; }
		}

		public int CallFromLocationID { get; set; }

		public DateTime? CollectDateTime { get; set; }
		public string CollectDate
		{
			get { return CollectDateTime != null ? ((DateTime)CollectDateTime).ToString("dd MMM yyyy") : ""; }
		}
		public string CollectTime
		{
			get { return CollectDateTime != null ? ((DateTime)CollectDateTime).ToString("HH:mm") : ""; }
		}

		public int CollectionLocationID { get; set; }

		public int ControllerMemberID { get; set; }

		public DateTime CreateDate { get; set; }

		public int CreatedByUserID { get; set; }

		public DateTime? DeliverDateTime { get; set; }
		public string DeliverDate
		{
			get { return DeliverDateTime != null ? ((DateTime)DeliverDateTime).ToString("dd MMM yyyy") : ""; }
		}
		public string DeliverTime
		{
			get { return DeliverDateTime != null ? ((DateTime)DeliverDateTime).ToString("HH:mm") : ""; }
		}

		public int DeliverToLocationID { get; set; }

		public string Description { get; set; }

		public DateTime? DutyDate { get; set; }
		public string DutyDateString
		{
			get { return DutyDate != null ? ((DateTime)DutyDate).ToString("dd MMM yyyy") : ""; }
		}

		public int FinalDestinationLocationID { get; set; }

		public DateTime? HomeSafeDateTime { get; set; }
		public string HomeSafeDate
		{
			get { return HomeSafeDateTime != null ? ((DateTime)HomeSafeDateTime).ToString("dd MMM yyyy") : ""; }
		}
		public string HomeSafeTime
		{
			get { return HomeSafeDateTime != null ? ((DateTime)HomeSafeDateTime).ToString("HH:mm") : ""; }
		}

		public bool IsTransfer { get; set; }

		public string Notes { get; set; }

		public int OriginLocationID { get; set; }

		public int RiderMemberID { get; set; }

		public int Urgency { get; set; }

		public int VehicleTypeID { get; set; }

		public bool BloodRun
		{
			get { return CallDateTime != null; }
		}

	}
}
