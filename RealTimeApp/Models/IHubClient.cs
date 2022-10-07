using System.Threading.Tasks;

namespace RealTimeApp.Models
{
  
        public interface IHubClient
        {
            Task BroadcastMessage();
        }
    
}
