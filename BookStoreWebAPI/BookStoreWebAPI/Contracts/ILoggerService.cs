using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreWebAPI.Contracts
{
    public interface ILoggerService
    {
        void LogInfo(string message);
        void LogDebug(string message);

    }
}
