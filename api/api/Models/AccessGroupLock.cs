﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class AccessGroupLock
	{
		public int AccessGroupId { get; set; }
		public AccessGroup AccessGroup { get; set; }

		public int LockId { get; set; }
		public Lock Lock { get; set; }
		public ICollection<EmployeeAccess> EmployeeAccesses { get; set; }

	}
}
