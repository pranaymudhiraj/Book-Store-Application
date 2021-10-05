using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreWebAPI.Models
{
    public class Cart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CartBookID { get; set; }

        [Required]
        public string CartBookName { get; set; }

        [Required]
        public int CartBookPrice { get; set; }

        public string CartBookImage { get; set; }

        public int Quantity { get; set; }
    }
}
