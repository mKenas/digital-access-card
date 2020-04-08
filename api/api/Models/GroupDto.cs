using System;
using System.Collections.Generic;
using api.Entities;

namespace api.Models
{
    public class GroupDto
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }

    }
}