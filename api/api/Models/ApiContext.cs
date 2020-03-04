﻿using Microsoft.EntityFrameworkCore;

namespace api.Models
{
	public class ApiContext : DbContext
	{
		public ApiContext(DbContextOptions<ApiContext> options) : base(options)
		{
		
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<EmployeeAccessLevel>()
				.HasKey(employeeAccessLevel => new { employeeAccessLevel.AccessLevelId, employeeAccessLevel.EmployeeId});
			modelBuilder.Entity<EmployeeAccessLevel>()
				.HasOne(employee => employee.Employee)
				.WithMany(employee => employee.EmployeeAccessLevels)
				.HasForeignKey(employee => employee.EmployeeId);
			modelBuilder.Entity<EmployeeAccessLevel>()
				.HasOne(accessLevel => accessLevel.AccessLevel)
				.WithMany(accessLevel => accessLevel.EmployeeAccessLevels)
				.HasForeignKey(accessLevel => accessLevel.AccessLevelId);

			modelBuilder.Entity<LockAccessLevel>()
				.HasKey(lockAccessLevel => new { lockAccessLevel.AccessLevelId, lockAccessLevel.LockId });
			modelBuilder.Entity<LockAccessLevel>()
				.HasOne(accessLevel => accessLevel.AccessLevel)
				.WithMany(accessLevel => accessLevel.LockAccessLevels)
				.HasForeignKey(accesslevel => accesslevel.AccessLevelId);
			modelBuilder.Entity<LockAccessLevel>()
				.HasOne(doorLock => doorLock.Lock)
				.WithMany(doorLock => doorLock.LockAccessLevels)
				.HasForeignKey(doorLock => doorLock.LockId);
		}

		public DbSet<Lock> Locks { get; set; }
		public DbSet<Employee> Employees { get; set; }
		
	}
}
