﻿using api.Types;
using AutoMapper;
using System;

namespace api.MappingProfiles
{
	public class SmartLockMapper : Profile
	{
        public SmartLockMapper()
		{
            CreateMap<Entities.SmartLock, Models.SmartLockDto>();

            CreateMap<Models.SmartLockDto, Entities.SmartLock>();
            CreateMap<Models.SmartLockCreationDto, Entities.SmartLock>();
            CreateMap<Models.SmartLockModificationDto, Entities.SmartLock>();
            CreateMap<Entities.SmartLock, Models.SmartLockModificationDto>();
            
            CreateMap<Entities.SmartLockUser, Models.SmartLockUserDto>();
            CreateMap<Entities.SmartLockGroup, Models.SmartLockGroupDto>();
            
            CreateMap<Status, string>().ConvertUsing(src => src.ToString().ToLower());
            CreateMap<string, Status>().ConvertUsing(src => (Status)Enum.Parse(typeof(Status), src, true));
        }
	}
}